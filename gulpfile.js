// -------------------------------------------------- Plugins
const gulp = require('gulp')
const pump = require('pump')
const del = require('del')
const gulpPug = require('gulp-pug')
const gulpSass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const notify = require('gulp-notify')
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
const vinylNamed = require('vinyl-named')
const through2 = require('through2')
const gulpBabel = require('gulp-babel')

// -------------------------------------------------- Paths
const srcPath = './src/'
const buildPath = './build/'

const paths = {
  html: {
    src: `${srcPath}pug/pages/**/*.pug`,
    output: `${buildPath}`,
    watch: `${srcPath}pug/**/*.pug`
  },
  css: {
    src: `${srcPath}scss/*.scss`,
    output: `${buildPath}css/`,
    watch: `${srcPath}scss/**/*.{scss,sass}`
  },
  js: {
    src: `${srcPath}js/app.js`,
    output: `${buildPath}js/`,
    watch: `${srcPath}js/**/*.*`
  },
  fonts: {
    src: `${srcPath}fonts/**/*.*`,
    output: `${buildPath}fonts/`,
    watch: `${srcPath}fonts/**/*.*`
  },
  media: {
    src: `${srcPath}media/**`,
    output: `${buildPath}/media/`,
    watch: `${srcPath}media/**/*.*`
  },
  icons: {
    src: `${srcPath}media/icons/*.svg`,
    output: `${srcPath}media/sprite/`,
    watch: `${srcPath}media/icons/*.svg`
  }
}

// -------------------------------------------------- Supported Browsers
const supportedBrowsers = [
  'last 3 versions', // http://browserl.ist/?q=last+3+versions
  'ie >= 10', // http://browserl.ist/?q=ie+%3E%3D+10
  'edge >= 12', // http://browserl.ist/?q=edge+%3E%3D+12
  'firefox >= 28', // http://browserl.ist/?q=firefox+%3E%3D+28
  'chrome >= 21', // http://browserl.ist/?q=chrome+%3E%3D+21
  'safari >= 6.1', // http://browserl.ist/?q=safari+%3E%3D+6.1
  'opera >= 12.1', // http://browserl.ist/?q=opera+%3E%3D+12.1
  'ios >= 7', // http://browserl.ist/?q=ios+%3E%3D+7
  'android >= 4.4', // http://browserl.ist/?q=android+%3E%3D+4.4
  'blackberry >= 10', // http://browserl.ist/?q=blackberry+%3E%3D+10
  'operamobile >= 12.1', // http://browserl.ist/?q=operamobile+%3E%3D+12.1
  'samsung >= 4' // http://browserl.ist/?q=samsung+%3E%3D+4
]

// -------------------------------------------------- Config
const autoprefixConfig = { browsers: supportedBrowsers, cascade: false }
const babelConfig = { targets: { browsers: supportedBrowsers } }

// -------------------------------------------------- Cleaning
const cleanMarkup = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del(`${paths.html.output}/*.html`) : undefined
}

const cleanMedia = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del(paths.media.output) : undefined
}

const cleanFonts = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del(paths.fonts.output) : undefined
}

const cleanStyles = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del(paths.css.output) : undefined
}

const cleanScripts = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del(paths.js.output) : undefined
}

const syncDirectories = (directory, file) => {
  const currentFile = file.split(`src\\${directory}\\`)[1]

  return del.sync([
      `${buildPath}${directory}/${currentFile}`, // Удаление конкретного файла при остлеживании.
      `${buildPath}${directory}/*/`], // Удаление пустых каталогов.
    { force: true })
}

// -------------------------------------------------- Functions
const buildMarkup = (mode) => (done) => {
  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.html.src),
      gulpPug({
        pretty: true
      }),
      // ...((mode === 'production')
      // 	? pump([])
      // 	: []),
      gulp.dest(paths.html.output)
      // ...((mode === 'development') ? [
      //   browserSync.reload({
      //     stream: true
      //   })
      // ] : [])
    ], done)
    : undefined
}

const buildStyles = (mode) => (done) => {
  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.css.src),
      ...((mode === 'development') ? [sourcemaps.init()] : []),
      gulpSass(),
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'SASS Error',
            message: 'Error <%= error.message %>'
          })(err)
          this.emit('end')
        }
      }),
      autoprefixer({
        cascade: true,
        remove: false
      }),
      rename({
        suffix: '.min',
        extname: '.css'
      }),
      ...((mode === 'development') ? [sourcemaps.write()] : []),
      gulp.dest(paths.css.output)
    ], done)
    : undefined
}

const buildScripts = (mode) => (done) => {
  let streamMode

  switch (mode) {
    case 'development':
      streamMode = require('./webpack/config.development.js')
      break
    case 'production':
      streamMode = require('./webpack/config.production.js')
      break
    default:
      streamMode = undefined
  }

  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.js.src),
      vinylNamed(),
      webpackStream(streamMode, webpack),
      sourcemaps.init({ loadMaps: true }),
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>'
          })(err)
          this.emit('end')
        }
      }),
      through2.obj(function(file, enc, cb) {
        const isSourceMap = /\.map$/.test(file.path)
        if (!isSourceMap) this.push(file)
        cb()
      }),
      gulpBabel({ presets: [['env', babelConfig]] }),
      ...((mode === 'production') ? [uglify()] : []),
      rename({
        suffix: '.min',
        extname: '.js'
      }),
      sourcemaps.write('./'),
      gulp.dest(paths.js.output)

    ], done)
    : undefined
}

const buildFonts = (mode) => (done) => {
  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.fonts.src),
      gulp.dest(paths.fonts.output)
      // ...((mode === 'production')
      // 	? pump([])
      // 	: []),
      // ...((mode === 'development')
      // 	? pump([])
      // 	: [])
    ], done)
    : undefined
}

const buildMedia = (mode) => (done) => {
  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.media.src),
      gulp.dest(paths.media.output)
      // ...((mode === 'production')
      // 	? pump([])
      // 	: []),
      // ...((mode === 'development')
      // 	? pump([])
      // 	: [])
    ], done)
    : undefined
}

const buildIcons = (mode) => (done) => {
  return ['development', 'production'].includes(mode)
    ? pump([
      gulp.src(paths.icons.src),
      svgo({
        js2svg: {
          pretty: true
        },
        removeTitle: true,
        removeEmptyAttrs: true
      }),
      cheerio({
        run: $ => {
          $('[fill]').removeAttr('fill')
          $('[stroke]').removeAttr('stroke')
          $('[style]').removeAttr('style')
        },
        parserOptions: { xmlMode: true }
      }),
      replace('&gt;', '>'),
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            render: {
              scss: {
                template: srcPath + 'scss/helpers/_sprite_template.scss',
                dest: '../../../scss/global/_sprite.scss'
              }
            },
            example: true
          }
        }
      }),
      gulp.dest(paths.icons.output)
    ], done)
    : undefined
}

const genericTask = (mode, context = 'building') => {
  let port
  let modeName

  switch (mode) {
    case 'development': {
      port = '3000'
      modeName = 'Development Mode'
    }
      break
    case 'production': {
      port = '8000'
      modeName = 'Production Mode'
    }
      break
    default: {
      port = undefined
      modeName = undefined
    }
  }

  const allBootingTasks = [
    // Clean & Build Markup
    Object.assign(cleanMarkup(mode), { displayName: `HTML: build - ${mode}` }),
    Object.assign(buildMarkup(mode), { displayName: `HTML: build - ${mode}` }),

    // Clean & Build Styles
    Object.assign(cleanStyles(mode), { displayName: `CSS: build - ${mode}` }),
    Object.assign(buildStyles(mode), { displayName: `CSS: build - ${mode}` }),

    // Clean & Build Scripts
    Object.assign(cleanScripts(mode), { displayName: `JS: build - ${mode}` }),
    Object.assign(buildScripts(mode), { displayName: `JS: build - ${mode}` }),

    // Clean & Build Fonts
    Object.assign(cleanFonts(mode), { displayName: `FONTS: build - ${mode}` }),
    Object.assign(buildFonts(mode), { displayName: `FONTS: build - ${mode}` }),

    // Clean & Build Media and Icons
    Object.assign(cleanMedia(mode), { displayName: `ICONS: build - ${mode}` }),
    Object.assign(buildMedia(mode), { displayName: `MEDIA: build - ${mode}` }),

    Object.assign(buildIcons(mode), { displayName: `ICONS: build - ${mode}` })
  ]

  const browserLoadingWatching = (done) => {
    browserSync.init({
      port,
      server: buildPath
    })

    gulp.watch(paths.html.watch).on('all', gulp.series(
      Object.assign(cleanMarkup(mode), { displayName: `Clean HTML: Build - ${modeName}` }),
      Object.assign(buildMarkup(mode), { displayName: `Watch HTML: Build - ${modeName}` }), browserSync.reload))

    gulp.watch(paths.css.watch).on('all', gulp.series(
      Object.assign(cleanStyles(mode), { displayName: `Clean CSS: Build - ${modeName}` }),
      Object.assign(buildStyles(mode), { displayName: `Watch CSS: Build - ${modeName}` }), browserSync.reload))

    gulp.watch(paths.js.watch).on('all', gulp.series(
      Object.assign(cleanScripts(mode), { displayName: `Clean JS: Build - ${modeName}` }),
      Object.assign(buildScripts(mode), { displayName: `Watch JS: Build - ${modeName}` }), browserSync.reload))

    gulp.watch(paths.media.watch)
      .on('all', gulp.series(
        Object.assign(cleanMedia(mode), { displayName: `Clean MEDIA: Build - ${modeName}` }),
        Object.assign(buildMedia(mode), { displayName: `Watch MEDIA: Build - ${modeName}` }), browserSync.reload))
      .on('unlink', (file) => syncDirectories('media', file))

    done()
  }

  return [
    ...allBootingTasks,
    Object.assign(browserLoadingWatching, { displayName: `Watching files - ${mode}` })
  ]
}

// -------------------------------------------------- Tasks
exports.default = gulp.series(...genericTask('development', 'building'))
exports.build = gulp.series(...genericTask('production', 'building'))

// -------------------------------------------------- For assets on backend
exports.buildCss = gulp.series(buildStyles('production'))
exports.buildJs = gulp.series(buildScripts('production'))

// -------------------------------------------------- Build icons & svg-sprite
exports.buildIcons = gulp.series(buildIcons('production'))
