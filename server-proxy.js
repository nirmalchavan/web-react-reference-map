'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.dev');

const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');
const fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');
const proxyConfigs = require('./proxy-configs');

const expressPort = process.env.PORT_EXPRESS || 3000;
const webpackPort = 3001;
const env = process.env.NODE_ENV || 'local';

// fixes self-signed cert error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// express server  (will handle all '/api/*' paths)
const app = express();
app.use(bodyParser.json());
app.listen(expressPort);

/*
 * takes original request (req) and performs a fetch on the proxied path
 * the result of the fetch (response) is then used to populate the original response (res)
 * after stripping off the 'Secure' flag from all cookies
 * finally, the res.send() is called in order to end the req/res cycle
 */
const fnFetch = (req, res, proxyPath) => {
    // create a new fetch request to the resolved proxyPath
    const headers = req.headers;
    headers.cookies = req.headers.cookie;
    fetch(
        proxyPath,
        {
            method: req.method,
            headers: headers,
            body: JSON.stringify(req.body),
            credentials: 'include'
        }
    )
        .then(response => {
            // set all headers on res from response (except for 'set-cookie')
            const newHeaders = response.headers._headers;
            for (const key in newHeaders) {
                if (key) {
                    const val = response.headers.get(key);
                    if (key !== 'set-cookie') {
                        res.set(key, val);
                    }
                }
            }

            // remove 'Secure' flag from cookies and add to header
            const cookies = response.headers._headers['set-cookie'];
            if (cookies) {
                for (var i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim().replace('; Secure', '');
                    res.append('set-cookie', cookie);
                }
            }

            res.status(response.status);
            if (response.status === 204) {
                return Promise.resolve({ 204: 'No Content' });
            }
            if (response.status > 299) {
                const obj = {};
                obj[response.status] = 'Non 200 response';
                return Promise.resolve(obj);
            }

            return response.json();
        })

        .then(json => {
            res.send(json);
        })
        .catch(e => {
            console.log('catching error:  ', e); // eslint-disable-line no-console
            res.send(e);
        });
};

if (env === 'nightwatch_test') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('./webpack.config.dev');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    // const webpackHotMiddleware = require('webpack-hot-middleware');
    // app.use(webpackHotMiddleware(compiler));
} else {
    // webpack-dev-server  (will handle non-api gets when env != 'nightwatch_test')
    const webpackServer = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: '/dist/',
        stats: { colors: true }
    });
    webpackServer.listen(webpackPort);
}

// get the config object from proxy-configs.js for the
// specific environment (env) in which this is running
// proxyConfig determines how this express server should re-direct api requests
console.log(`proxyConfigs for ${env}:  `);
console.log(proxyConfigs.environment[env]);
const proxyConfig = proxyConfigs.environment[env];

/*
 * avoid CORS
 * intercept all calls to /api/* and redirect based on proxyConfig
 * also intercept and make changes to req and res headers
 * */
app.all('/api/*', (req, res) => {
    // get information from proxyConfig.  either:
    //     1. a new path based on proxyConfig.host
    //     2. a custom function to execute based on proxyConfig.func
    let proxyFunc;
    let proxyPath = 'INVALID';
    const path = req.url;
    let found = false;
    let isProxyFunc = false;

    for (const key in proxyConfig) {
        if (path.match(key) !== null) {
            found = true;
            const proxyObj = proxyConfig[key];
            if (proxyObj.func) {
                isProxyFunc = true;
                proxyFunc = proxyObj.func;
            } else if (proxyObj.host) {
                proxyPath = proxyObj.host;
                if (proxyObj.appendPath) {
                    proxyPath += path;
                }
            }
        }
    }

    if (!found) {
        console.log(); // eslint-disable-line no-console
        const msg = 'URL %s not found.  Ensure there is an entry in the ' +
            'proxyConfig object (located in proxy-configs.js) for this URL ' +
            'for Environment: %s';
        console.error(msg, path, env); // eslint-disable-line no-console
        console.log(); // eslint-disable-line no-console
        return;
    }

    if (isProxyFunc) {
        proxyFunc(req, res);
    } else {
        fnFetch(req, res, proxyPath);
    }
});

if (env === 'nightwatch_test') {
    app.get('*', (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    });
}

app.get('*', proxy(url.parse(`http://localhost:${webpackPort}`)));
