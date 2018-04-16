const Eagle = require('gulp-eagle');

// Eagle.config.buildPath = '';

Eagle((mix)=> {
  mix
    .sass('./src/div/index.scss', 'css/div.css')
    .browserSync({
      server: {
        directory: true,
        baseDir: './'
      }
    });
});
