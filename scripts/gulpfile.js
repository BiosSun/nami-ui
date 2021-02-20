const del = require('del')
const path = require('path')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const ts = require('gulp-typescript')
const merge = require('merge2')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const jeditor = require('gulp-json-editor')

sass.compiler = require('sass')

async function clean() {
    await del(['dist'])
}

function plain() {
    const resetPackageMain = jeditor({
        main: 'lib/index.js',
        module: 'lib/index.js',
    })

    return gulp
        .src(['README.md', 'package.json', '*.scss'], { allowEmpty: true })
        .pipe(gulpif('package.json', resetPackageMain))
        .pipe(gulp.dest('dist'))
}

function lib() {
    const tsProject = ts.createProject(path.join(__dirname, '..', 'tsconfig.json'))
    const tsResult = gulp
        .src('lib/**/*.{ts,tsx}')
        .pipe(replace('__DEV__', "process.env.NODE_ENV === 'development'"))
        .pipe(tsProject())

    const otherResult = gulp.src(['lib/**/*', '!lib/**/*.{ts,tsx}']).pipe(
        gulpif(
            '*.scss',
            sass({
                includePaths: ['node_modules', path.join(__dirname, '..', 'node_modules')],
            }),
        ),
    )

    return merge([tsResult.js, tsResult.dts, otherResult])
        .pipe(
            gulpif(
                '*.js',
                replace(
                    /^(\s*import\s*['"][^'"]+?\.)scss(['"])/gm,
                    (match, p1, p2) => `${p1}css${p2}`,
                ),
            ),
        )
        .pipe(gulp.dest('dist/lib'))
}

exports.default = gulp.series(clean, plain, lib)
