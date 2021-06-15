'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');
const print = require('gulp-print').default;

const config = require('../config/index');


gulp.task('css', function () {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,                   //清除html中注释的部分
        removeEmptyAttributes: true,            //清除所有的空属性
        removeScriptTypeAttributes: true,       //清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes: true,    //清除所有Link标签上的type属性
        minifyJS: true,                         //压缩html中的javascript代码
        minifyCSS: true                         //压缩html中的css代码
    };

    return gulp.src('./src/css/**/*.css')
        .pipe(print())
        .pipe(concat('main.min.css'))
        .pipe(gulpif(config.env === 'production', csso()))
        .pipe(gulp.dest('./dist/css'));
})


module.exports = {}