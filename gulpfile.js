var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var paths = {
    js: './src/js/*.js',
    html: './src/*.html'
};

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest('./dist'));
});


gulp.task('scripts', function () {
    return gulp.src(paths.js)
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', ['html','scripts'], function () {
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

});

gulp.task('default',function(){
    gulp.start(['scripts', 'html']);
});