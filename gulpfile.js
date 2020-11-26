const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');

const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-transform-modules-commonjs'
  ]
}

//上线环境
function buildForProd() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: cleanEntry,
        ...babelConfig,
      })
    )
    .pipe(gulp.dest('dist'));
}

function buildForDev() {
  //开发环境整体拷贝
  const _entry = 'src/server/**/*';
  return watch(
    _entry,
    {
      ignoreInitial: false,
    },
    function() {
      gulp.src(_entry).pipe(gulp.dest('dist'));
    }
  );
}

let build = gulp.series(buildForDev);
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildForProd, buildconfig);
}
gulp.task('default', build);