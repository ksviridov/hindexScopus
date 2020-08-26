const yargs = require('yargs').argv
const gulp = require('gulp')
const watch = require('gulp-watch')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const less = require('gulp-less')
const gulpif = require('gulp-if')
const autoprefixer = require('gulp-autoprefixer')
const styleLint = require('gulp-stylelint')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const imgmin = require('gulp-imagemin')
const postcss = require('gulp-postcss')
const path = require('path')
const fs = require('fs')

const apps_path = path.resolve('./resources/frontend')
const app_name = yargs.app

if(app_name && !fs.existsSync(`${apps_path}/${app_name}`))
    throw new Error('Not active app!')

const input = `${apps_path}/${app_name || '**'}`
const output = `./public/view${app_name ? `/${app_name}` : ''}`

const IsDevelopment = !process.env.NODE_ENV || yargs.mode || process.env.NODE_ENV ==='development'

gulp.task('livereload', () => {
    browserSync.create();

    browserSync.init({
        server: {
            baseDir: `${output}`
        },
        files: [
            `${output}/**/*.*`
        ]
    });
});

gulp.task('html', () => {
    return gulp.src(`${input}/index.html`)
        .pipe(gulp.dest(output))
})

gulp.task('libs', () => {
    return gulp.src(`${input}/libs/**/*.*`)
        .pipe(gulp.dest(!app_name ? output : `${output}/libs`))
})

gulp.task('images', () => {
    return gulp.src(`${input}/images/**/*.*`)
        .pipe(gulpif(!IsDevelopment, imgmin()))
        .pipe(gulp.dest(!app_name ? output : `${output}/images`))
})

gulp.task('styles', () => {
    const plugins = [
        require('postcss-import')()
    ]

    return gulp.src(`${input}/styles/**/[^_]*.less`)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(postcss(plugins))
        .pipe(gulp.dest(!app_name ? output : `${output}/styles`))
})

gulp.task('stylesLint', () => {
    return gulp.src(`${input}/styles/**/*.less`)
        .pipe(styleLint({
            configFile: '.stylelintrc',
            failAfterError: false,
            debug: true,
            syntax: 'less',
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
})

gulp.task('js', () => {
    return gulp.src(`${input}/js/**/*.js`)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulpif(!IsDevelopment, uglify()))
        .pipe(gulp.dest(!app_name ? output : `${output}/js`));
})

gulp.task('watch', () => {
    watch(`${input}/images/**/*.*`, gulp.series('images'));
    watch(`${input}/styles/**/*.less`, gulp.series('stylesLint', 'styles'));
    watch(`${input}/*.html`, gulp.series('html'));
    watch(`${input}/js/**/*.js`, gulp.series('js'));
});

const tasks = ['html', 'stylesLint', 'images', 'libs', 'styles', 'js']
app_name && IsDevelopment && tasks.push(gulp.parallel('watch', 'livereload'))

exports.default = gulp.series(...tasks)
