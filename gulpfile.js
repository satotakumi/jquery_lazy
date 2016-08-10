'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
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
        .pipe($.uglify())
        .pipe($.header(banner, { pkg: pkg }))
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build']);
