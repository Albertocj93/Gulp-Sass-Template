var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    sourcemaps       = require('gulp-sourcemaps'),
    minifyCss        = require('gulp-clean-css'),
    rename           = require('gulp-rename'),
    browserSync      = require('browser-sync').create();



gulp.task('sass', function(){
    // sass directory
    return gulp.src('sass/*scss')
            .pipe(sass())
            //outputstyle (nested, compact, expanded, compressed)
            .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
            // sourcemaps
            .pipe(sourcemaps.init())
            // sourcemaps output directory
            .pipe(sourcemaps.write(('app/maps')))
            // css output directory
            .pipe(gulp.dest('app/css')),
            // watch file
            gulp.watch('sass/*.scss', ['sass']);
});


// minify css (merge + autoprefix + rename)
gulp.task('minify-css', function(){
   return gulp.src('app/css/style.css')
            .pipe(minifyCss())
             // autoprefixer
            .pipe(autoprefixer({
                browsers: ['last 15 versions'],
                cascade: false
            }))
            // minify output directory
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('app/css'))
            // browser sync
            .pipe(browserSync.reload({stream: true})),
            // watch file
            gulp.watch('app/css/style.css', ['minify-css']);
});


// sass/css browser tracking
gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: 'app'
        }
    });
    // watch html
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

// gulp default (sass, minify-css, browser-sync) method
gulp.task('default', ['sass', 'minify-css', 'browser-sync']);
