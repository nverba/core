var gulp       = require('gulp');
var requireDir = require('require-dir')('./tasks');
var browserSync  = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('build:static', ['build:img', 'build:json']);

gulp.task('build', ['flush:js', 'build:img', 'build:json', 'build:css', 'build:templates', 'build:main', 'build:libs', 'build:index', 'build:static']);

gulp.task('build:html', ['build:css', 'build:templates', 'build:index']);

gulp.task('watch:html', ['build:html'], function() {
  return gulp.watch(['./src/**/*.scss', './src/**/*.html'], ['build:html']);
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "localhost:8080"
    });
});

gulp.task('serve', ['build:css', 'browser-sync'], function () {
    gulp.watch("./src/**/*.scss", ['build:css']);
    gulp.watch(["./src/**/*.js", "./src/**/*.html"], reload);
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({script: 'server.js', env: { 'NODE_ENV': 'development' }}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});