const   gulp                = require('gulp'),
        sass                = require('gulp-sass'),
        csso                = require('gulp-csso'),
        rename              = require('gulp-rename'),
        browserSync         = require('browser-sync'),
        babelify            = require('babelify'),
        uglify              = require('gulp-uglify'),
        source              = require('vinyl-source-stream'),
        buffer              = require('vinyl-buffer'),
        browserify          = require('browserify');

const path = {
    dist: {
        html:       'dist/',
        css:        'dist/css/',
        js:         'dist/js/'
    },
    app: {
        html:       'app/*.html',
        sass:       'app/scss/*.scss',
        js:         'app/js/index.js'
    },
    watch: {
        html:       'app/*.html',
        sass:       'app/scss/**/*.scss',
        js:         'app/js/**/*.js'
    }
};

// html
gulp.task('html', () => {
     gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html))
});

// browserSync
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
});

// css
gulp.task('scss', () => {
    gulp.src(path.app.sass)
        .pipe(sass())
        .pipe(csso({
            restructure: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream());
});

// js
gulp.task('js', () => {
    browserify(path.app.js)
        .transform('babelify', {
            presets : ['es2015']
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest(path.dist.js))
});

// watch
gulp.task('watch', () => {
    gulp.watch(path.watch.sass,['scss']);
    gulp.watch(path.watch.js,['js']).on('change', browserSync.reload);
    gulp.watch(path.watch.html,['html']).on('change', browserSync.reload);
});

gulp.task('default',['html','scss', 'js', 'browserSync', 'watch']);
