var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var elixir = require('laravel-elixir');
var filter = require('gulp-filter');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var merge  = require('merge-stream');
var gulpif = require('gulp-if');

elixir.extend('bower', function(cssFile, cssOutput, jsFile, jsOutput) {

    var config = elixir.config;
    var cssFile = cssFile || 'vendor.css';
    var jsFile = jsFile || 'vendor.js';

    new elixir.Task('bower', function(){
        var css = gulp.src(mainBowerFiles())
            .pipe(filter('**/*.css'))
            .pipe(concat(cssFile))
            .pipe(gulpif(config.production, minify()))
            .pipe(gulp.dest(cssOutput || config.get('assets.css.folder')))

        var js = gulp.src(mainBowerFiles())
            .pipe(filter('**/*.js'))
            .pipe(concat(jsFile))
            .pipe(gulpif(config.production, uglify()))
            .pipe(gulp.dest(jsOutput || config.get('assets.js.folder')))
            .pipe(new elixir.Notification('Bower CSS & JS Files Imported!'));
        return merge(css, js);
    });

});