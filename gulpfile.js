const Eagle = require('gulp-eagle');

// Eagle.config.buildPath = '';

Eagle(function(mix) {
  mix.sass('./src/div/index.scss', 'css/div.css');
});
