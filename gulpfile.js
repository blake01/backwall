var gulp = require('gulp')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')

gulp.task('build', function(){
    return gulp.src(['backwall.js'])
        .pipe(gp_rename('backwall.min.js'))
        .pipe(gp_uglify({preserveComments:'license'}))
        .pipe(gulp.dest('.'));
});

gulp.task('build-standalone', function(){
    return gulp.src(['modernizr-custom.js', 'backwall.js'])
        .pipe(gp_concat('concat.js'))
        .pipe(gp_rename('backwall.standalone.min.js'))
        .pipe(gp_uglify({preserveComments:'license'}))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['build', 'build-standalone'], function(){});