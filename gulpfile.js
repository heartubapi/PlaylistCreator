(function() {
    'use strict';
  
    var gulp = require('gulp');
    var runSequence = require('run-sequence').use(gulp);
    var wiredep = require('wiredep').stream;
    var browserSync = require('browser-sync').create();
  
    gulp.task('development', function(){
      runSequence('bower', 'serve');
    });
  
    gulp.task('serve', function() {
      browserSync.init( {
        server: {
          baseDir: './src',
          routes: {'/bower_components': 'bower_components'}
        }
      } );
  
      gulp.watch('./src/**/*.*').on('change', function() {
        browserSync.reload();
      });
    });
  
    gulp.task('bower', function() {
      gulp.src('./src/index.html')
      .pipe(wiredep ({
        exclude: ['jquery', 'bootstrap.js']
      }))
      .pipe(gulp.dest('./src'));
    });
  
    gulp.task('default', ['development']);
  
  })();