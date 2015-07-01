'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var watch = false;



/**
 * JavaScript
 */

gulp.task('build:js', function () {
  var js = 'src/scripts/main.jsx';
  var config = {
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader?stage=1'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };

  if(watch) {
    config.watch = true;
    config.devtool = '#inline-source-map';

    return gulp.src(js)
      .pipe(webpack(config))
      .pipe(gulp.dest('build/'));
  } else {
    return gulp.src(js)
      .pipe(webpack(config))
      .pipe($.uglify())
      .pipe(gulp.dest('build/'));
  }
});



/**
 * Jade
 */

gulp.task('build:jade', function() {
  return gulp.src('src/index.jade')
    .pipe($.jade())
    .pipe(gulp.dest('build/'));
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

gulp.task('clean', function(cb) {
  del(['dist/**/*', '!dist/.git{,/**}'], {dot: true}, cb);
});



/**
 * watch
 */

gulp.task('watch', ['clean:build', 'serve'], function(cb) {
  watch = true;

  runSequence(['build'], function() {
    gulp.watch('src/index.jade', ['build:jade']);
    cb();
  });
});



/**
 * build
 */

gulp.task('build', ['clean'], function (cb) {
  runSequence(['build:js', 'build:jade'], cb);
});



/**
 * default
 */

gulp.task('default', ['build']);
