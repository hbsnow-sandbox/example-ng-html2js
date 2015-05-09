'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var watch = false;



/**
 * JavaScript
 */

gulp.task('build:js', function () {
	var js = './src/scripts/main.jsx';
	var loader = {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader?stage=1'
			}
		]
	}

	if (watch) {
		return gulp.src(js)
			.pipe($.webpack({
				watch: true,
				devtool: '#inline-source-map',
				output: {
					filename: '[name].js'
				},
				module: loader,
				resolve: {
					extensions: ['', '.js', '.jsx']
				}
			}))
			.pipe(gulp.dest('./build/'));
	} else {
		return gulp.src(js)
			.pipe($.webpack({
				output: {
					filename: '[name].js'
				},
				module: loader,
				resolve: {
					extensions: ['', '.js', '.jsx']
				}
			}))
			.pipe($.uglify())
			.pipe(gulp.dest('./build/'))
			.pipe($.gzip())
			.pipe(gulp.dest('./build/'));
	}
});



/**
 * Jade
 */

gulp.task('build:jade', function() {
	var jade = './src/index.jade';

	if (watch) {
		return gulp.src(jade)
			.pipe($.jade())
			.pipe(gulp.dest('./build/'));
	} else {
		return gulp.src(jade)
			.pipe($.jade())
			.pipe(gulp.dest('./build/'))
			.pipe($.gzip())
			.pipe(gulp.dest('./build/'));
		}
});



/**
 * serve
 */

gulp.task('serve', function() {
	return gulp.src('build')
		.pipe($.webserver());
});


/**
 * clean
 */

gulp.task('clean:build', function(cb) {
	del(['dist/**/*', '!dist/.git{,/**}'], { dot: true }, cb);
});



/**
 * watch
 */

gulp.task('watch', ['clean:build', 'serve'], function(cb) {
	watch = true;

	runSequence('build', function() {
		gulp.watch('./src/scripts/**/*.{jsx,es6}', ['build:js']);
		gulp.watch('./src/index.jade', ['build:jade']);
		cb();
	});
});



/**
 * build
 */

gulp.task('build', ['clean:build'], function (cb) {
	runSequence(['build:js', 'build:jade'], cb);
});



/**
 * default
 */

gulp.task('default', ['watch']);
