
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('./src/*.js')
    // gulp-uglify 插件并不改变文件名
    // .pipe(uglify())
    // 因此使用 gulp-rename 插件修改文件的扩展名
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./output/'));
}


// function defaultTask(cb) {
//   cb();
// }

// exports.default = defaultTask;


// exports.default = function() {
//   return src('src/*.js')
//     // gulp-uglify 插件并不改变文件名
//     .pipe(uglify())
//     // 因此使用 gulp-rename 插件修改文件的扩展名
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(dest('output/'));
// }