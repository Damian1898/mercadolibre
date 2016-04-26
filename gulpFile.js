var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var uglifyjs = require('gulp-uglifyjs');
var rimraf = require('gulp-rimraf');
var autoprefixer = require('gulp-autoprefixer');
var minifyHTML = require('gulp-minify-html');
var connect = require('gulp-connect');


gulp.task('minifyHtml', function() {
    return gulp.src('src/htmlUncompress/**/*.html')
        .pipe(minifyHTML({
            empty: true
        }))
        .pipe(gulp.dest('src/html'));
});

gulp.task('sass', ['clearStyle'], function() {
	return gulp.src('src/sass/**/*.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			}))
			.pipe(gulp.dest('src/css'))
});

gulp.task('createCss', ['sass'], function() {
    gulp.src([
            'node_modules/chico/dist/ui/chico.css', 'src/css/**/*.css'
        ])
        .pipe(uglifycss())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(connect.reload());
});

gulp.task('clearStyle', function() {
    return gulp.src('src/css/style.min.css', {
            read: true
        })
        .pipe(rimraf())
});


gulp.task('createJs', function() {
    gulp.src([
            'node_modules/chico/node_modules/tiny.js/dist/tiny.js', 'node_modules/chico/dist/ui/chico.js', 'src/jsUncompress/**/*.js'
        ])
        .pipe(uglifyjs())
        .pipe(concat('functions.min.js'))
        .pipe(gulp.dest('src/js/'))
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['src/htmlUncompress/**/*.html'], ['minifyHtml']);
	gulp.watch('src/sass/**/*.scss', ['createCss']);
    gulp.watch('src/jsUncompress/**/*.js', ['createJs']);
});

