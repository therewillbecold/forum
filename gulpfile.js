let gulp = require('gulp')
let babel = require('gulp-babel');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css'); // 压缩css
let uglify = require('gulp-uglify');// 压缩js
let pump = require('pump');
let gulpif = require('gulp-if'); // 条件判断
let webserver = require('gulp-webserver') // 启动一个server
let postcss = require('gulp-postcss')
let autoprefixer = require('autoprefixer');

// 获取当前的模式是线上版本还是开发版本
let isProduction = process.env.NODE_ENV === 'production' // 是否是线上发布版本


//复制静态资源文件
gulp.task('copy', [], function () {
  gulp.src([
    './src/*.html',
    './src/*.css',
    './src/**/*.{jpg,jpeg,png,gif}'
  ])
    .pipe(gulp.dest('./build'))
})



//sass的编译
gulp.task('sass', [], function () {
  var plugins = [
    autoprefixer({ browsers: ['cover 99.5%', 'ie 6-8'] }),
  ];

  return gulp.src('./src/**/*.{scss,css}')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(gulp.dest('./build'))
    .on('end', () => {
      console.log('sass build 完成')
    })
})


/*glob*/
// gulp.src('src/**')
//     .pipe(gulp.dest('product'))

// gulp.src('src/**/*.js')
//     .pipe(gulp.dest('build'))
//     .pipe(gulp.dest('product'))



//     gulp.task('t1',[],function(){
//         console.log('task1');
//     })
//     gulp.task('t2',[],function(){
//         console.log('task2');
//     })
//     gulp.task('t3',['t1','t2'],function(){
//         console.log('task3');
//     })
//     gulp.task('default',['t3'],function(){
//         console.log('default');
//     })

// gulp.task('sass', function () {
//   return gulp.src('./src/**.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('build'));
// });



// 编译js
gulp.task('js', function (cb) {
  pump([
    gulp.src('src/**/*.js'),
    // babel编译 
    babel({
      presets: ['@babel/env']
    }),
    //js压缩
    gulpif(isProduction, uglify()),
    gulp.dest('build')
  ],
    cb
  );
});

gulp.task('server', function () {
  // server的 root 目录
  gulp.src('build')
    // 启动一个server 监听8000端口, 
    .pipe(webserver({
      port: 8009,
      // path: '/',
      open: 'http://localhost:8009', //自动打开的网址,方便开发
      livereload: true, //网页自动刷新
      open: true
    }));
});

gulp.task('dev', ['watch', 'server'])

gulp.task('default', ['js', 'sass', 'copy'], function () {
  console.log('done!!!!');
})

gulp.task('watch', [], function () {
  console.log('监听到文件改动');
  return gulp.watch('./src/**', ['default'])
})
