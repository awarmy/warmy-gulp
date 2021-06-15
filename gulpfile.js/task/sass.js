'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');

const config = require('../config/index');



gulp.task('sass', function () {
    var options = config.env === 'production' ? { outputStyle: 'compressed' } : {};

    return gulp.src('./src/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(options)).on('error', sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulpif(config.env === 'production', rename({ extname: '.min.css' })))
        .pipe(gulp.dest('./dist/css'))
})


module.exports = {};