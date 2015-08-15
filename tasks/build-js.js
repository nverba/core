var gulp          = require('gulp');
var browserify    = require('browserify');
var uglify        = require('gulp-uglify');
var streamify     = require('gulp-streamify');
var source        = require('vinyl-source-stream');
var freeze        = require('gulp-freeze');
var babelify      = require('babelify');
var gulpif        = require('gulp-if');
var del           = require('del');
var argv          = require('yargs').argv;
var watchify      = require('watchify');
  
// Use browserify to build build/main.js from src/app.js with injected deps

gulp.task('build:libs', function() {
  return buildJavaScript('libs.js', './src/js/libs.js');
});

gulp.task('build:main', function() {
  return buildJavaScript('main.js', './src/js/app.js', true);
});

gulp.task('flush:js', function() {
  if (argv.production) {
    return del(argv.production ? 'public/js/*.*' : 'build/js/*.*');
  } else {
    return true;
  }
});

function buildJavaScript(src, entry, babel) {
  
  var bundleStream = browserify({ entries: entry, debug: !argv.production });
  if (babel) { bundleStream.transform(babelify) }
  var watchBundle = argv.production || argv.all ? bundleStream : watchify(bundleStream); 
  
  function bundle() {
    return watchBundle
      .bundle()
      .on('error', function(err){
        console.log(err.message);
      })
      .pipe(source(src))
      .pipe(gulpif(argv.production, streamify(uglify())))
      .pipe(gulpif(argv.production, streamify(freeze())))
      .pipe(gulpif(argv.production, gulp.dest('./public/js'), gulp.dest('./build/js')));
  }
  
  if (!argv.production || argv.all) {
    watchBundle.on('update', bundle);
    watchBundle.on('log', function(msg) {
      console.log(msg);
    });
  }
  
  return bundle();
  
}
