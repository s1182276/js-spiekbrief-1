//gulpfile.js

const gulp = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
var order = require('gulp-order');

const html = () => {
   return gulp.src('./src/index.html')
      .pipe(gulp.dest('dist'));
};

const css = () => {
   return gulp.src('./src/css/*.css')
       .pipe(order(["variables.css",
                             "style.css"]))
       .pipe(concat('style.css'))
       .pipe(gulp.dest('dist'));
};

const js = () => {
   return gulp.src('./src/js/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist'));
};

const json = () => {
   return gulp.src('./src/json/*.json')
      .pipe(gulp.dest('dist'));
};

gulp.task('watch', function () {
   browserSync.init({
      server: "./dist/"
   });

   gulp.watch("./src/**/*.*", series(html,css,js,json));
   gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
});

/* TODO door student, opgave 1a */
gulp.task('build', async function (){
   html();
   css();
   json();
   js();
})