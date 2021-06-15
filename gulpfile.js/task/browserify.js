const gulp = require('gulp');
const uglify = require('gulp-uglify');        //js 压缩
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
//会将Browserify的输出文件适配成gulp能够解析的格式
const source = require('vinyl-source-stream');
//vinyl-buffer: 将 vinyl 对象内容中的 Stream 转换为 Buffer
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const config = require('../config');
const babelify = require('babelify');
const rename = require('gulp-rename');
const path = require('path');
// const rename = require('gulp-rename');
const es = require('event-stream');

const print = require('gulp-print').default;

const vendor = require('./vendors');


let entries = config.entry;
if (!Array.isArray(entries)) {
    if (typeof entries === 'string') {
        entries = [entries];
    }
    else {
        throw new Error('入口文件参数类型错误');
    }
}
let vendors = config.vendors;
if (typeof vendors === 'undefined') {
    vendors = [];
}
else if (!Array.isArray(vendors)) {
    throw new Error("vendors 类型必须是数组");
}

function browserifyTask(cb) {
    let tasks = entries.map(function (entry) {
        let b = browserify({
            entries: entry,//一个数组，跳过数组中每个文件的所有 require 和全局解析
            //适用于jquery或threejs等巨型、无需解析的库，避免解析耗时过长
            noParse: ['jquery'],
            debug: true, 	//告知browserify在运行同时生成内联sourcemap用于调试
            transform: [babelify]
        })
            .external(vendors) //这个功能就是排除打包某些模块的

        let name = path.basename(entry);

        return b.bundle()
            //将Browserify的输出文件适配成gulp能够解析的格式
            .pipe(source(name))
            .pipe(print())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(print())
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(gulpif(config.env === 'production', uglify()))
            .pipe(gulp.dest('./dist/js'));
    })



    es.merge.apply(null, tasks);

    cb();
}

vendor.create(vendors);

gulp.task('browserify', gulp.series(browserifyTask, 'vendors'));
// let name = path.basename(entries);
// gulp.task('browserify', function (cb) {
//     let b = browserify({
//         entries: entries,//一个数组，跳过数组中每个文件的所有 require 和全局解析
//         //适用于jquery或threejs等巨型、无需解析的库，避免解析耗时过长
//         noParse: ['jquery'],
//         debug: true, 	//告知browserify在运行同时生成内联sourcemap用于调试
//         transform: [babelify]
//     })

//     b.bundle()
//         //将Browserify的输出文件适配成gulp能够解析的格式
//         .pipe(source(name))
//         .pipe(rename({ extname: '.min.js' }))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(gulpif(config.env === 'production', uglify()))
//         .pipe(gulp.dest('./dist/js'));

//     cb();
// })


module.exports = {};