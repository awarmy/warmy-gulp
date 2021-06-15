'use strict';

const minimist = require('minimist');
/*
env         development
            production
*/
let optionsDefault = {
    string: 'env',
    default: { env: process.env.MODE_ENV || 'production' }
};
let options = minimist(process.argv.slice(2), optionsDefault);

module.exports = options;
// js 入口文件
module.exports.entry = ["src/js/app.js", "src/js/hello.js"];
//
module.exports.vendors = ['jquery'];
//静态入口页面
module.exports.template = "index.html";