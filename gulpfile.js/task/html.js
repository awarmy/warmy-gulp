'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include'); //包含文件
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const print = require('gulp-print').default;

const config = require('../config/index');


gulp.task('html', function () {
    return gulp.src("./src/*.html")
        .pipe(print())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpif(config.env === 'production', htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest("./dist"));
})


module.exports = {}
