import conditional from 'rollup-plugin-conditional';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import uglify from 'rollup-plugin-uglify';
// import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-html';
import path from 'path';

const { build, type } = process.env;
const prod = build === 'production';
const name = 'circular-progress-bar';

export default {
  input: `./src/components/${type}/index.js`,
  output: {
    file: `dist/${name}-${type}${prod ? '.min' : ''}.js`,
    format: type === 'angularjs' ? 'umd' : 'cjs',
    name
  },
  plugins: [
    // postcss({
    //   preprocessor: (content, id) =>
    //     new Promise(resolve => {
    //       resolve({ code: sass.renderSync({ file: id }).css.toString() })
    //     }),
    //   sourceMap: !prod,
    //   extract: true,
    //   extensions: ['.scss'],
    //   plugins: prod ? [autoprefixer, cssnano()] : [autoprefixer]
    // }),
    html({
      htmlMinifierOptions: {
        collapseWhitespace: true
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    conditional(prod, [uglify()]),
    license({
      banner: {
        file: path.join(__dirname, 'banner.text'),
        encoding: 'utf-8'
      }
    }),
    filesize()
    // conditional(!prod, [
    //   serve({
    //     open: true,
    //     contentBase: '.',
    //     host: '0.0.0.0',
    //     port: 3000
    //   })
    // ])
  ]
};
