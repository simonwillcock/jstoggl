var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  wrap = require('gulp-wrap'),
  rename = require('gulp-rename'),
  header = require('gulp-header'),
  jshintreporter = require('jshint-stylish'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  beautify = require('gulp-beautify'),
  strip = require('gulp-strip-comments'),
  pkg = require('./package.json');

var banner = [
  '/**',
  ' ** <%= pkg.name %> - <%= pkg.description %>',
  ' ** @author <%= pkg.author %>',
  ' ** @version v<%= pkg.version %>',
  ' **/',
  '',
  ''
].join('\n');

var paths = {
  js: ['./src/**/intro.js','./src/**/!(outro)*.js','./src/**/outro.js'],
  html: './src/*.html'
};

gulp.task('html', function () {
  return gulp.src(paths.html)
  .pipe(gulp.dest('dist'));
});


gulp.task('jshint', function () {
  return gulp.src(paths.js)
  .pipe(concat('toggl.js'))
  .pipe(jshint())
  .pipe(jshint.reporter(jshintreporter))
  .pipe(jshint.reporter('fail'));
});

gulp.task('compress', ['jshint'], function(){
  return gulp.src(paths.js)
  .pipe(concat('toggl.min.js'))
  .pipe(uglify({mangle: true}))
  .pipe(header(banner, {pkg: pkg}))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', ['jshint'], function(){
  return gulp.src(paths.js)
  .pipe(concat('toggl.js'))
  .pipe(wrap('(function(){ "use strict"; <%= contents %> })();'))
  .pipe(strip())
  .pipe(header(banner, {pkg: pkg}))
  .pipe(beautify({indentSize: 2}))
  .pipe(gulp.dest('dist/js'));
});
gulp.task('dist', ['scripts','compress']);

gulp.task('serve', ['html','dist'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./dist/'],
    }
  });

  // watch for changes
  gulp.watch([
    paths.js,
    paths.html,
    ]).on('change', reload);

  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default',function(){
  gulp.start(['dist', 'html']);
});