const gulp = require('gulp');
const cleaner = require('gulp-clean');
const gulpSass = require('gulp-sass');
const jsConcat = require('gulp-concat');
const jsUglify = require('gulp-terser');
const jsInclude = require('gulp-include');
const renameIt = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const sourceMaps = require('gulp-sourcemaps');


function highlight_js() {
    return gulp.src('./node_modules/highlightjs/highlight.pack.js', { since: gulp.lastRun(js) })
        .pipe(renameIt('highlight.js'))
        .pipe(gulp.dest('dist/js'));
}

function js() {
    return highlight_js() && gulp.src('src/js/*.js')
        .pipe(sourceMaps.init())
        .pipe(jsInclude({
            extensions: 'js',
            hardFail: true,
            separateInputs: true
        }))
        .on('error', console.log)
        .pipe(jsConcat('wysiwyg.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/js'));
}

function js_minify() {
    return gulp.src(['dist/js/*.js', '!dist/js/*.min.js'])
        .pipe(jsUglify())
        .pipe(renameIt({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
}

function highlight_css() {
    return gulp.src('./node_modules/highlightjs/styles/default.css', { since: gulp.lastRun(js) })
        .pipe(renameIt('highlight.css'))
        .pipe(gulp.dest('dist/css'));
}

function css() {
    return highlight_css() && gulp.src('src/scss/*.scss')
        .pipe(sourceMaps.init())
        .pipe(gulpSass({
            includePaths: ['node_modules']
        }).on('error', gulpSass.logError))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'));
}

function css_minify() {
    return gulp.src(['dist/css/*.css', '!dist/css/*.min.css'])
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(renameIt({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
}

function minify() {
    return js_minify() && css_minify();
}

function serve() {
    browserSync.init({
        open: true,
        server: {
            baseDir: [
                './docs',
                './dist'
            ]
        }
    });
}

function reload(done) {
    browserSync.reload();
    done();
}

function watch() {
    gulp.watch('src/scss/**/*.scss', gulp.series(css, css_minify, reload));
    gulp.watch('src/js/**/*.js', gulp.series(js, css_minify, reload));
    return;
}

function cleanup() {
    return gulp.src('dist/*', { read: false })
        .pipe(cleaner());
}

exports.js = js;
exports.css = css;
exports.cleanup = cleanup;
exports.js_minify = js_minify;
exports.css_minify = css_minify;
exports.minify = gulp.parallel(js_minify, css_minify);
exports.watch = gulp.parallel(css, js, minify, watch);
exports.serve = gulp.parallel(css, js, minify, watch, serve);
exports.default = gulp.series(cleanup, css, js, minify, watch, serve);