const gulp = require('gulp');

gulp.task('out', function () {
    gulp.src('src/**/*.less')
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['out'], function() {
    console.log('default task');
});

