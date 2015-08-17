var gulp       = require('gulp');
var requireDir = require('require-dir')('./tasks');
var browserSync = require('browser-sync').create();

gulp.task('build:static', ['build:img', 'build:json']);

gulp.task('build', ['flush:js', 'build:img', 'build:json', 'build:css', 'build:templates', 'build:main', 'build:libs', 'build:index', 'build:static']);

gulp.task('build:html', ['build:css', 'build:templates', 'build:index']);

gulp.task('watch:html', ['build:html'], function() {
  return gulp.watch(['./src/**/*.scss', './src/**/*.html'], ['build:html']);
});