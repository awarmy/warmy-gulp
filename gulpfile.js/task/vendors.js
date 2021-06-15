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

// const print = require('gulp-print').default;

const log = require('../../node_modules/fancy-log');

// const log = require('fancy-log');

function create(entries) {
    if (!Array.isArray(entries)) {
        if (typeof entries === 'string') {
            entries = [entries];
        }
        else {
            throw new Error('入口文件参数类型错误');
        }
    }

    gulp.task('vendors', function (cb) {
        let name = 'vendors';

        let b = browserify({
            debug: true, 	//告知browserify在运行同时生成内联sourcemap用于调试
            // transform: [babelify]
        })

        log("Start bundle vendors");
        log("vendors list:");
        entries.forEach(function (lib) {
            log(lib);
            b.require(lib);
        })

        b.transform([babelify])
            .bundle()
            //将Browserify的输出文件适配成gulp能够解析的格式
            .pipe(source(name))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(gulpif(config.env === 'production', uglify()))
            .pipe(gulp.dest('./dist/js'));

        cb();
    })
}

module.exports = { create };