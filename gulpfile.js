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

let isDev = true

const srcPath = 'src/'
const appPath = 'app/'
const buildPath = 'build/'

const path = {
  html: {
    src: srcPath + 'pug/pages/*.pug',
    app: appPath,
    build: buildPath,
    watch: srcPath + 'pug/'
  },
  css: {
    src: srcPath + 'sass/*.{sass,scss}',
    app: appPath + 'css/',
    build: buildPath + 'css/',
    watch: srcPath + 'sass/'
  },
  js: {
    src: srcPath + 'js/app.js',
    app: appPath + 'js/',
    build: buildPath + 'js/',
    watch: srcPath + 'js/'
  },
  img: {
    src: srcPath + 'img/**/*.*',
    app: appPath + 'img/',
    build: buildPath + 'img/',
    watch: srcPath + 'img/'
  },
  icons: {
    src: srcPath + 'img/icons/*.svg',
    app: appPath + 'img/icons/',
    build: buildPath + 'img/icons/',
    watch: srcPath + 'img/icons/'
  },
  fonts: {
    src: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
    app: appPath + 'fonts/',
    build: buildPath + 'fonts/',
    watch: srcPath + 'fonts/'
  },
  clean: {
    app: './' + appPath,
    build: './' + buildPath
  }
}

const devMode = cb => {
  isDev = true

  cb()
}

const prodMode = cb => {
  isDev = false

  cb()
}

const server = cb => {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: isDev ? appPath : buildPath
    },
    notify: false
  })

  cb()
}

const html = cb => {
  return src(path.html.src)
    .pipe(newer(path.html.app + '*.html'))
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest(path.html.app))

  cb()
}

const css = cb => {
  return src(path.css.src, { base: srcPath + 'sass/' })
    .pipe(newer(path.css.app + '*.css'))
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (err) {
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

const js = cb => {
  return src(path.js.src, { base: srcPath + 'js/' })
    .pipe(newer(path.js.app + '*.js'))
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (err) {
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
      },
      mode: isDev ? 'development' : 'production',
      devtool: isDev ? 'eval-source-map' : 'hidden-source-map'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(path.js.app))

  cb()
}

const img = cb => {
  return src(path.img.src, { base: srcPath + 'img/' })
    .pipe(dest(path.img.app))

  cb()
}

const fonts = cb => {
  return src(path.fonts.src, { base: srcPath + 'fonts/' })
    .pipe(dest(path.fonts.app))

  cb()
}

const spriteSettings = {
  spritePath: '../sprite.svg',
  styleSptitePath: '../../../sass/base/_sprite.scss',
  templateForSprite: srcPath + 'sass/helpers/_sprite_template.scss',
  destFilesPath: srcPath + 'img/sprite/'
}

const icons = cb => {
  return src(path.icons.src, { base: srcPath + 'img/icons/' })
    .pipe(svgo({
      js2svg: {
        pretty: true
      },
      removeTitle: true,
      removeEmptyAttrs: true
    }))
    .pipe(cheerio({
      run: $ => {
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
          sprite: spriteSettings.spritePath,
          render: {
            scss: {
              dest: spriteSettings.styleSptitePath,
              template: spriteSettings.templateForSprite
            }
          },
          example: true
        }
      }
    }))
    .pipe(dest(spriteSettings.destFilesPath))

  cb()
}

const cleanApp = cb => {
  return del(path.clean.app)

  cb()
}

const cleanBuild = cb => {
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
exports.devMode = devMode
exports.prodMode = prodMode

const buildApp = gulp.series(cleanApp, devMode, html, css, js, img, fonts, icons)

// ------------------------------ BUILDING

const buildHtml = cb => {
  gulp.series(html)
  return src([path.html.app + '*.html'])
    .pipe(dest(path.html.build))

  cb()
}

const buildCss = cb => {
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

const buildJs = cb => {
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
    // .pipe(rename({
    //   basename: 'app',
    //   extname: '.js'
    // }))
    // .pipe(dest(path.js.build))
    .pipe(uglify())
    // .pipe(rename({
    //   suffix: '.min',
    //   extname: '.js'
    // }))
    .pipe(dest(path.js.build))

  cb()
}

const buildImg = cb => {
  gulp.series(img)

  return src(path.img.app + '**/*.*')
    .pipe(dest(path.img.build))

  cb()
}

const buildFonts = cb => {
  gulp.series(fonts)

  return src(path.fonts.app + '**/*.*')
    .pipe(dest(path.fonts.build))

  cb()
}

const build = gulp.series(cleanBuild, buildApp, prodMode, buildHtml, buildCss, buildJs, buildImg, buildFonts)

exports.build = build
exports.buildHtml = gulp.series(html, buildHtml)
exports.buildCss = gulp.series(css, buildCss)
exports.buildJs = gulp.series(js, buildJs)
exports.buildImg = gulp.series(img, buildImg)
exports.buildFonts = gulp.series(fonts, buildFonts)

// ------------------------------ WATCHING

const watchFiles = () => {
  gulp.watch(path.html.watch).on('change', gulp.series(html, browserSync.reload))
  gulp.watch(path.css.watch).on('change', gulp.series(css, browserSync.reload))
  gulp.watch(path.js.watch).on('change', gulp.series(js, browserSync.reload))
  gulp.watch(path.img.watch).on('change', gulp.series(img, browserSync.reload))
  gulp.watch(path.icons.watch).on('change', gulp.series(icons, browserSync.reload))
  gulp.watch(path.fonts.watch).on('change', gulp.series(fonts, browserSync.reload))
}

const watchDev = gulp.series(buildApp, server, watchFiles)
const watchBuild = gulp.series(build, server)

exports.watch = watchDev
exports.watchBuild = watchBuild
exports.default = watchDev
