var gulp         = require('gulp');
var requireDir   = require('require-dir')('./tasks');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var nodemon      = require('gulp-nodemon');
var gutil        = require('gulp-util');

var sass         = require('gulp-sass');
var inject       = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var freeze       = require('gulp-freeze');
var streamify    = require('gulp-streamify');
var gulpif       = require('gulp-if');
var argv         = require('yargs').argv;
var del          = require('del');

gulp.task('build:static', ['build:img', 'build:json']);

gulp.task('build', ['flush:js', 'build:img', 'build:json', 'build:css', 'build:templates', 'build:main', 'build:libs', 'build:index', 'build:static']);

gulp.task('build:html', ['build:templates', 'build:index']);

gulp.task('watch:html', ['build:html'], function() {
  return gulp.watch(['./src/**/*.scss', './src/**/*.html'], ['build:html']);
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: {
          target: "localhost:8080",
          middleware: function (req, res, next) {
            setTimeout(function() {
              next();
            }, 100)
          }
        }

    });
});

gulp.task('serve', ['build:css', 'browser-sync', 'build:main'], function () {
    gulp.watch('./src/**/*.scss', ['build:css']);
    gulp.watch(["./src/**/*.js", "./src/**/*.html"], ['build:html', reload]);
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

gulp.task('build:css', function () {
  
  return del(argv.production ? 'public/css/*.*' : 'build/css/*.*', function() {
    
    // Collect all .scss file names from components and inject into main.scss as dependencies
    return gulp.src('./src/scss/main.scss')
      .pipe(inject(
        gulp.src(['./src/**/*.scss', '!./src/scss/immediate.scss', '!./src/scss/main.scss'], {read: false}), {
          starttag: '/* {{name}}:{{ext}} */',
          endtag: '/* endinject */',
          transform: function (filepath) {
            return filepath === 'main.scss' ? '' : '@import "../..' + filepath + '";';
          }
        }
      ))
  	  .pipe(streamify(sass()))
      .pipe(autoprefixer())
      .pipe(gulpif(argv.production, freeze()))
      .pipe(gulpif(argv.production, gulp.dest('./public/css'), gulp.dest('./build/css')))
      .pipe(browserSync.stream());
      
  });
});