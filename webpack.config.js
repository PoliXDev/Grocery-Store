const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Plugin personalizado para crear el archivo .nojekyll
class CreateNoJekyllFilePlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CreateNoJekyllFilePlugin', (compilation) => {
      const fs = require('fs');
      const outputPath = compilation.outputOptions.path;
      const filePath = path.join(outputPath, '.nojekyll');
      
      try {
        fs.writeFileSync(filePath, '');
        console.log('Archivo .nojekyll creado correctamente');
      } catch (err) {
        console.error('Error al crear el archivo .nojekyll:', err);
      }
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './js/app.js',
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: isProduction ? './' : '/'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '/')
      },
      open: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'img', to: 'img' },
          { from: 'css', to: 'css' },
          { from: 'favicon.ico', to: 'favicon.ico' },
          { from: 'icon.png', to: 'icon.png' },
          { from: 'site.webmanifest', to: 'site.webmanifest' }
        ]
      }),
      isProduction ? new CreateNoJekyllFilePlugin() : null
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  };
}; 