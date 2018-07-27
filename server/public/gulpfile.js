// Подключаем Gulp
var gulp = require("gulp");

// Подключаем плагины Gulp
var sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename");

//Пути
var sass_landing = 'landing/scss/**/*.scss',
    saas_dest_landing = 'landing/css/',
    js_landing = 'landing/js/*.js',
    js_dest_landing = 'landing/js/dist';

//scss to css
gulp.task('styles_landing', function () {
    gulp.src(sass_landing)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest(saas_dest_landing));
});

//js to min.js
gulp.task("js_landing", function () {
    return gulp.src(js_landing)
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(js_dest_landing));
});

// Запуск тасков по умолчанию
gulp.task("default", ["styles_landing", "js_landing"]);