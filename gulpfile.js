'strict';

const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
const react = require('babel-preset-react');
const runSequence = require('run-sequence');
const eslint = require('gulp-eslint');
const nightwatch = require('gulp-nightwatch');
const karma = require('karma');
const bump = require('gulp-bump');
const zip = require('gulp-zip');


const LIB = './lib';

gulp.task('build', (cb) => runSequence('clean', 'test', 'nightwatch', 'compile-js', 'copy-scss', (err) => {
	if(err){
		if(err.message.indexOf('test') > -1){
			const unitTestSummary = require('./reports/TESTS-unit.json');
    	console.log('[ERROR] gulp build task failed due to', err.message, unitTestSummary.summary);
    	console.log('[FAIL] gulp build task failed - exiting with code ' + unitTestSummary.summary.exitCode);
    	return process.exit(unitTestSummary.summary.exitCode);
  	}
  	if(err.message.indexOf('nightwatch') > -1){
			console.log('[ERROR] gulp build task failed due to', err);
    	return process.exit(1);
  	}
  	else{
   	 	return process.exit(1);
  	}
	}
	else{
		 return cb();
	}
}));

gulp.task('clean', del.bind(null, [LIB]));

gulp.task('compile-js', () => {
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [react, es2015]
        }))
        .pipe(gulp.dest(LIB));
});

gulp.task('copy-scss', function () {
    gulp.src('./src/**/*.scss')
        .pipe(gulp.dest(LIB));
});

gulp.task('eslint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Defined method of updating NPM version:
gulp.task('bump', function(){
  gulp.src('./*.json')
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

// Zips up final bundle
gulp.task('zip', () => {
  const pjson = require('./package.json');
	return gulp.src(['dist/*', '!dist/*.json'])
		.pipe(zip('v' + pjson.version +'.zip'))
		.pipe(gulp.dest('dist'));
});

//jasmine testing
gulp.task('jasmine', function () {
    var JasminePlugin = require('gulp-jasmine-browser/webpack/jasmine-plugin');
    var plugin = new JasminePlugin();
    var jasmineSrcFiles = ['test/**/spec-helper.js', 'test/**/mock-ajax.js', 'test/**/*Spec.js'];
    var webpack = require('webpack-stream');
    var webpackConfig = require('./webpack.config-jasmine.js');
    var jasmine = require('gulp-jasmine-browser');
    var _ = require('lodash');
    return gulp.src(jasmineSrcFiles)
        .pipe(webpack(_.merge(webpackConfig, {
            watch: true,
            output: { filename: 'spec.js' },
            plugins: [plugin]
        })))
        .pipe(jasmine.specRunner())
        .pipe(jasmine.server({ whenReady: plugin.whenReady }));
});

//Nightwatch End to End tests using 4 different browsers
gulp.task('nightwatch', () => {
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch.json',
            cliArgs: [ '--env chrome,ie,firefox' ]

        }));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
	var karmaServer = karma.Server;
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
