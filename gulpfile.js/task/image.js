'use strict';

const gulp = require('gulp');
const pngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');

const config = require('../config/index')


// gulp.task("images", function (cb) {
//     cb();
// })
//打包其他资源
gulp.task('images', function () {
    var options = {
        optimizationLevel: 1, 	//类型：Number  默认：1  
        //取值范围：0-7（优化等级）
        progressive: true, 	  	//类型：Boolean 默认：false 
        //无损压缩jpg图片
        interlaced: true,     	//类型：Boolean 默认：false 
        //隔行扫描gif进行渲染
        multipass: true, 		//类型：Boolean 默认：false
        //多次优化svg直到完全优化
        use: [pngquant(), imageminJpegtran()]
    }

    return gulp.src(['./src/**/*.{jpg,png,svg}'])
        .pipe(gulpif(config.env === 'production', imagemin(options)))
        .pipe(gulp.dest("./dist"));
})


module.exports = {};