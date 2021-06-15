'use strict';

const gulp = require('gulp');
const log = require('../../node_modules/fancy-log');

const browserSync = require('browser-sync').create();

const config = require('../config/index');

let pathname = config.template ? config.template : "./";
log(`Start page:${pathname}`);
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './dist',         //访问目录
            index: pathname
        }
    });

})


module.exports = {};