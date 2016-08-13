'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;
var pkg = require('./package.json');

gulp.task('build', function() {
    var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '',
    ''].join('\n');

    gulp.src('src/jquery.lazy.js')
        .pipe($.header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('.tmp'))
        .pipe($.uglify())
        .pipe($.header(banner, { pkg: pkg }))
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function() {
  return gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.tmp'));
});

// Watch files for changes & reload
gulp.task('serve', ['build'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
        baseDir: "./"
    },
    port: 3000
  });

  gulp.watch(['*.html'], reload);
  gulp.watch(['src/**/*.js'], ['build', reload]);
});

gulp.task('deploy', function() {
  return gulp.src('./tmp/**/*')
    .pipe($.ghPages());
});
