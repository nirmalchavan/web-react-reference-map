'strict';

const WebpackConfig = require('webpack-config');

WebpackConfig.environment.setAll({
    env() {
        return process.env.WEBPACK_ENV || process.env.NODE_ENV;
    }
});

module.exports = new WebpackConfig().extend('./conf/webpack.config.[env].js');
