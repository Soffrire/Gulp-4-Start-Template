/* eslint-disable no-unreachable */
const { src, dest, series, parallel } = require('gulp')

const gulp = require('gulp')
const pug = require('gulp-pug')
const sourcemaps = require('gulp-sourcemaps')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')
const webpackStream = require('webpack-stream')
const svgSprite = require('gulp-svg-sprite')
const svgo = require('gulp-svgo')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const webpack = require('webpack')
const changed = require('gulp-changed')
const newer = require('gulp-newer')
const del = require('del')
const fonter = require('gulp-fonter')

const srcPath = 'src/'
const appPath = 'app/'
const buildPath = 'build/'

const path = {
  html: {
    src: srcPath + 'pug/pages/*.pug',
    app: appPath,
    build: buildPath,
    watch: srcPath + 'pug/**/*.pug'
  },
  css: {
    src: srcPath + 'sass/*.sass',
    app: appPath + 'css/',
    build: buildPath + 'css/',
    watch: srcPath + 'sass/**/*.{sass,scss}'
  },
  js: {
    src: srcPath + 'js/app.js',
    app: appPath + 'js/',
    build: buildPath + 'js/',
    watch: srcPath + 'js/**/*.js'
  },
  img: {
    src: srcPath + 'img/**/*.*',
    app: appPath + 'img/',
    build: buildPath + 'img/',
    watch: srcPath + 'img/**/*.*'
  },
  icons: {
    src: srcPath + 'img/icons/*.svg',
    app: appPath + 'img/icons/',
    build: buildPath + 'img/icons/',
    watch: srcPath + 'img/icons/*.svg'
  },
  fonts: {
    src: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
    app: appPath + 'fonts/',
    build: buildPath + 'fonts/',
    watch: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}'
  },
  clean: {
    app: './' + appPath,
    build: './' + buildPath
  }
}

function server(cb) {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: appPath
    },
    notify: false
  })
  cb()
}

function html(cb) {
  return src(path.html.src)
    .pipe(newer(path.html.app + '*.html'))
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest(path.html.app))
  cb()
}

function css(cb) {
  return src(path.css.src, { base: srcPath + 'sass/' })
    .pipe(newer(path.css.app + '*.css'))
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'SASS Error',
          message: 'Error <%= error.message %>'
        })(err)
        this.emit('end')
      }
    }))
    .pipe(sass({
      includePaths: './node_modules/'
    }))
    .pipe(autoprefixer({
      cascade: true,
      remove: false
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(dest(path.css.app))
  cb()
}

function js(cb) {
  return src(path.js.src, { base: srcPath + 'js/' })
    .pipe(newer(path.js.app + '*.js'))
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'JS Error',
          message: 'Error: <%= error.message %>'
        })(err)
        this.emit('end')
      }
    }))
    .pipe(webpackStream({
      output: {
        filename: 'app.js'
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(path.js.app))
  cb()
}

function img(cb) {
  return src(path.img.src, { base: srcPath + 'img/' })
    .pipe(dest(path.img.app))
    .pipe(browserSync.reload({ stream: true }))
  cb()
}

function fonts(cb) {
  return src(path.fonts.src, { base: srcPath + 'fonts/' })
    // todo: использовать если лень конвертировать вручную.
    // .pipe(fonter({
    //   ubset: [66, 67, 68, 69, 70, 71],
    //   combinePath: true,
    //   formats: ['ttf', 'eot', 'woff']
    // }))
    .pipe(dest(path.fonts.app))
  cb()
}

function icons(cb) {
  return src(path.icons.src, { base: srcPath + 'img/icons/' })
    .pipe(svgo({
      js2svg: {
        pretty: true
      },
      removeTitle: true,
      removeEmptyAttrs: true
    }))
    .pipe(cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill')
        $('[stroke]').removeAttr('stroke')
        $('[style]').removeAttr('style')
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
          render: {
            scss: {
              dest: '../../../sass/base/_sprite.scss',
              template: srcPath + 'sass/helpers/_sprite_template.scss'
            }
          },
          example: true
        }
      }
    }))
    .pipe(dest(srcPath + 'img/sprite/'))
  cb()
}

function cleanApp(cb) {
  return del(path.clean.app)

  cb()
}

function cleanBuild(cb) {
  return del(path.clean.build)

  cb()
}

exports.html = html
exports.css = css
exports.js = js
exports.img = img
exports.fonts = fonts
exports.icons = icons
exports.server = server
exports.cleanApp = cleanApp
exports.cleanBuild = cleanBuild

const buildApp = gulp.series(cleanApp, html, css, js, img, fonts, icons)

// ------------------------------ BUILDING

function buildHtml(cb) {
  gulp.series(html)
  return src([path.html.app + '*.html'])
    .pipe(dest(path.html.build))
  cb()
}

function buildCss(cb) {
  return src(path.css.app + 'app.min.css')
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(dest(path.css.build))
  cb()
}

function buildJs(cb) {
  gulp.series(js)
  return src(path.js.app + 'app.min.js')
    .pipe(webpackStream({
      output: {
        filename: 'app.min.js'
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      optimization: {
        minimize: false
      }
    }))
    .pipe(rename({
      basename: 'app',
      extname: '.js'
    }))
    .pipe(dest(path.js.build))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(path.js.build))
  cb()
}

function buildImg(cb) {
  gulp.series(img)
  return src(path.img.app + '**/*.*')
    .pipe(dest(path.img.build))
  cb()
}

function buildFonts(cb) {
  gulp.series(fonts)
  return src(path.fonts.app + '**/*.*')
    .pipe(dest(path.fonts.build))
  cb()
}

const build = gulp.series(cleanBuild, buildApp, buildHtml, buildCss, buildJs, buildImg, buildFonts)

exports.build = build
exports.buildHtml = gulp.series(html, buildHtml)
exports.buildCss = gulp.series(css, buildCss)
exports.buildJs = gulp.series(js, buildJs)
exports.buildImg = gulp.series(img, buildImg)
exports.buildFonts = gulp.series(fonts, buildFonts)

// ------------------------------ WATCHING

function watchFiles() {
  gulp.watch(path.html.watch).on('change', gulp.series(html, browserSync.reload))
  gulp.watch(path.css.watch).on('change', gulp.series(css, browserSync.reload))
  gulp.watch(path.js.watch).on('change', gulp.series(js, browserSync.reload))
  gulp.watch(path.img.watch).on('change', gulp.series(img, browserSync.reload))
  gulp.watch(path.icons.watch).on('change', gulp.series(icons, browserSync.reload))
  gulp.watch(path.fonts.watch).on('change', gulp.series(fonts, browserSync.reload))
}

const watch = gulp.series(buildApp, server, watchFiles)

exports.watch = watch
exports.default = watch
