'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('ngdocs', [], function () {
	var gulpDocs = require('gulp-ngdocs');
	var options = {
		scripts: [
			'bower_components/angular/angular.min.js',
			'bower_components/angular/angular.min.js.map',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-animate/angular-animate.min.js.map'
		]
	};
	return gulp.src(conf.paths.src + '/**/*.js')
		.pipe(gulpDocs.process(options))
		.pipe(gulp.dest(conf.paths.docs));
});
