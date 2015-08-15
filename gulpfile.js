var gulp       = require('gulp');
var requireDir = require('require-dir')('./tasks');

gulp.task('build:static', ['build:img', 'build:json']);

gulp.task('build', ['flush:js', 'build:img', 'build:json', 'build:css', 'build:templates', 'build:main', 'build:libs', 'build:index', 'build:static']);