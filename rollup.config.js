import babel from 'rollup-plugin-babel';
import conditional from 'rollup-plugin-conditional';
import uglify from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import sass from 'node-sass';
import autoprefixer from 'autoprefixer';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import serve from 'rollup-plugin-serve';

const prod = process.env.build === 'production';

export default {
  input: 'src/index.js',
  plugins: [
    postcss({
      preprocessor: (content, id) => new Promise(resolve => {
        resolve({ code: sass.renderSync({ file: id }).css.toString() });
      }),
      sourceMap: !prod,
      extract: true,
      extensions: ['.scss'],
      plugins: prod ? [autoprefixer, cssnano()] : [autoprefixer]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    conditional(prod, [
      uglify()
    ]),
    license({
      banner: {
        file: path.join(__dirname, 'banner.text'),
        encoding: 'utf-8'
      }
    }),
    filesize(),
    conditional(!prod, [
      serve({
        open: true,
        contentBase: '.',
        host: '0.0.0.0',
        port: 3000
      })
    ])
  ],
  output: {
    file: prod ? 'dist/bee.min.js' : 'dist/bee.js',
    format: 'es'
  }
};
