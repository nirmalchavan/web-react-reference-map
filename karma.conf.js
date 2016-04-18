var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

		phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    singleRun: true,

    frameworks: [ 'jasmine-ajax', 'jasmine'],
    files: [
      'test/specs/test_index.js'
    ],

    preprocessors: {
      'test/specs/test_index.js': [ 'webpack' ]
    },
    logLevel: config.LOG_DEBUG,
    reporters: [ 'junit' , 'json'],

    junitReporter: {
        outputFile: 'reports/TESTS-unit.xml'
    },
    jsonReporter: {
        stdout: false,
        outputFile: 'reports/TESTS-unit.json'
    },

    webpack: {
      module: {
        loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loaders: ['babel']
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};
