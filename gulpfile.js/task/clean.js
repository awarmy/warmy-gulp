const gulp = require('gulp');
const clean = require('gulp-clean');
const print = require('gulp-print').default;

gulp.task('clean', function () {
    return gulp.src('./dist/*')
        .pipe(print())
        .pipe(clean());
})

module.exports = {};