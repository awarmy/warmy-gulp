'use strict';
const clean = require('./task/clean');
//browserify 打包js
require('./task/browserify');
//sass
require('./task/sass');
//css文件 bundle
require('./task/css');
//图片压缩
require('./task/image');
//html
require('./task/html');
//
require('./task/server');


