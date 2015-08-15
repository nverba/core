var gulp         = require('gulp');
var sass         = require('gulp-sass');
var inject       = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var freeze       = require('gulp-freeze');
var streamify    = require('gulp-streamify');
var gulpif       = require('gulp-if');
var del          = require('del');
var argv         = require('yargs').argv;

gulp.task('build:css', function () {
  
  return del(argv.production ? 'public/css/*.*' : 'build/css/*.*', function() {
    
    // Collect all .scss file names from components and inject into main.scss as dependencies
    return gulp.src('./src/scss/main.scss')
      .pipe(inject(
        gulp.src(['./src/**/*.scss', '!./src/scss/immediate.scss'], {read: false}), {
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
      .pipe(gulpif(argv.production, gulp.dest('./public/css'), gulp.dest('./build/css')));
  });
});

gulp.task('watch:css', ['build:css'], function() {
  return gulp.watch(['./src/**/*.scss', '!./src/scss/immediate.scss'], ['build:css']);
});