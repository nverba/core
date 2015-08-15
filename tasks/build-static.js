var gulp   = require('gulp');
var del    = require('del');
var gulpif = require('gulp-if');
var argv   = require('yargs').argv;

gulp.task('build:img', function () {
  return del(argv.production ? 'public/img/**/*.*' : 'build/img/**/*.*', function() {
    return gulp.src('./src/img/**/*.*')
		  .pipe(gulpif(argv.production, gulp.dest('./public/img/'), gulp.dest('./build/img/')));
  });
});

gulp.task('build:json', function () {
  return del(argv.production ? 'public/lang/*.*' : 'build/lang/*.*', function() {
    return gulp.src('./src/lang/**/*.*')
		  .pipe(gulpif(argv.production, gulp.dest('./public/lang/'), gulp.dest('./build/lang/')));
  });
});