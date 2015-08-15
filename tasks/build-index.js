var gulp   = require('gulp');
var inject = require('gulp-inject');
var sass   = require('gulp-sass');
var gulpif = require('gulp-if');
var argv   = require('yargs').argv;

if (argv.production) {
  gulp.task('build:index', ['build:main', 'build:templates', 'build:libs'], function () {
    return buildIndex()
  });
} else {
  gulp.task('build:index', function () {
    return buildIndex()
  });
}

gulp.task('watch:index', ['build:index'], function() {
  return gulp.watch(['./src/index.html', './src/scss/immediate.scss'], ['build:index']);
});

function buildIndex() {
  
  var immediateScss = gulp.src(['./src/scss/immediate.scss'], {read: true}).pipe(sass());
  var sources = gulp.src(['./css/*.css', './js/*.js'], {read: false, cwd: 'public'});
  
  return gulp.src('./src/index.html')
    .pipe(inject(immediateScss, {
      starttag: '/* {{name}}:immediate:{{ext}} */',
      endtag: '/* endinject */',
      transform: function (filepath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulpif(argv.production, inject(sources, { relative: false })))
    .pipe(gulpif(argv.production, gulp.dest('./public/'), gulp.dest('./build/')));
}