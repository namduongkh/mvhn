const gulp = require('gulp');
var babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const ngAnnotate = require('gulp-ng-annotate');
const strip = require('gulp-strip-comments');
const sass = require('gulp-sass');
const stripDebug = require('gulp-strip-debug');
var purgeSourcemaps = require('gulp-purge-sourcemaps');

const $ = gulpLoadPlugins();
const minDir = './public/assets/min';
const cssDir = './public/assets/css';
const jsDir = './public/assets/js';
const libDir = './public/libs';

gulp.task('minjs', () => {
    gulp
        .src([
            jsDir + '/app.js',
            jsDir + '/config.js',
        ])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(ngAnnotate())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(minDir))
        .pipe(babel({ presets: ['es2015'], compact: false }))
        .pipe(purgeSourcemaps())
        .pipe(uglify())
        // .pipe(stripDebug())
        .pipe(gulp.dest(minDir));
});

gulp.task('mincss', function() {
    gulp.src([
            cssDir + '/styles.css'
        ])
        .pipe(concatCss('app.min.css'))
        .pipe(gulp.dest(minDir))
        .pipe(cleanCSS())
        .pipe(gulp.dest(minDir));
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*", "app/**/*.*"],
        browser: "google chrome",
        port: 3090
    });
});


gulp.task('nodemon', function() {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
});


gulp.task('styles', function() {
    gulp.src(['app/modules/web*/views/css/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(cssDir));
});

gulp.task('javascripts', () => {
    gulp.src(['app/modules/web*/views/js/*.js'])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.toString());
                this.emit('end');
            }
        }))
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDir));
});

gulp.task('build', ['minjs', 'mincss']);

gulp.task('default', ['nodemon', 'browser-sync', 'styles', 'javascripts'], function() {
    gulp.watch(['app/modules/**/views/css/*.scss'], ['styles']);
    gulp.watch(['app/modules/**/views/js/*.js'], ['javascripts']);
});