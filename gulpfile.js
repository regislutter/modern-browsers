var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require("gulp-util");

gulp.task('style', function() {
    return gulp.src('assets/scss/style.scss') //config.mainSrc
        .pipe(sass() //config.settings
            .on('error', console.error.bind(console))
    )
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css')); //config.dest
});