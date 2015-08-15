var gulp          = require('gulp');
var freeze        = require('gulp-freeze');
var gulpif        = require('gulp-if');
var del           = require('del');
var templateCache = require('gulp-angular-templatecache');
var argv          = require('yargs').argv;

gulp.task('build:templates', function() {
  return gulp.src(['./src/components/**/*.html'])
    .pipe(templateCache({ standalone: true, root: './',  base: function(file) {  
      return './' + file.history[0].replace(file.cwd + '/src', "")
    }}))
    .pipe(gulpif(argv.production, freeze()))
    .pipe(gulpif(argv.production, gulp.dest('./public/js'), gulp.dest('./build/js')));
});