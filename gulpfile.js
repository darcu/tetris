/* eslint-disable */
var gulp = require('gulp');
var babel = require("gulp-babel");

gulp.task('brow', function() {
	return gulp.src('lib/script/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/script/'));
});

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('modules', function() {
	browserify({
			entries: 'lib/script/input.js',
			debug: true
		})
		.transform(babelify)
		.bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest('dist/script'));
});
