const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');

var files = ['**/*.js', '!node_modules/*', '!**/db/*'];

gulp.task('eslint', () => {
  return gulp.src(files)
    .pipe(eslint(__dirname + '/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loaders: [ 'babel-loader?presets[]=react' ]
          }
        ]
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('test', () => {
  return gulp.src(['test/*test.js'], {
    read: false
  })
    .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch('/app/**/*.js', ['build:dev']);
});

gulp.task('build:dev', ['webpack:dev', 'html:dev']);
gulp.task('default', ['eslint', 'test', 'build:dev']);
