var gulp = require('gulp');

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

var rename = require('gulp-rename');

var header = require('gulp-header');

var markdown = require('gulp-markdown');

var puppeteer = require('puppeteer-core');

gulp.task('sass', function() {
    return gulp.src('static/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('static/css/compiled'));
});

gulp.task('sass:minify', function() {
    return gulp.src('static/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed'} ).on('error', sass.logError))
        .pipe(rename({ suffice: '.min' }))
        .pipe(gulp.dest('static/css/compiled'));
});

gulp.task('markdown', function() {
    return gulp.src('docs/**/*.md')
        .pipe(markdown())
        .pipe(header("{{!< docsHeader }}\n"))
        .pipe(rename({extname: '.hbs'}))
        .pipe(gulp.dest('views/docs'));
});

gulp.task('run:attach', gulp.series([
    'sass',
    'sass:minify',
    'markdown',
    async function() {
        var browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome.exe',
            ignoreHTTPSErrors: true,
            defaultViewport: null,
            args: [
                '--disable-infobars'
            ]
        });
        var page = (await browser.pages())[0];
        await page.goto('http://localhost:5000', { waitUntil: 'load', timeout: 0});

        gulp.watch('static/sass/**/*.scss', gulp.series('sass', 'sass:minify', function(done) { page.reload(); done(); }));
        gulp.watch('docs/**/*.md', gulp.series('markdown'));
        gulp.watch('views/**/*.html', function(done) { page.reload(); done(); });
        gulp.watch('views/**/*.hbs', function(done) { page.reload(); done(); });
        gulp.watch('static/**/*.js', function(done) { page.reload(); done(); });
    }
]))