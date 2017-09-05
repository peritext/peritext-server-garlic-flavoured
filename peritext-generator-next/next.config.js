const story = require('./static/story');
const path = require('path')
const glob = require('glob')
var nodeExternals = require('webpack-node-externals');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ANALYZE = process.env.ANALYZE;

/**
 * Building the static routes
 */
module.exports = {
  exportPathMap: function () {
    return Object.assign(
    {
      "/": { page: "/" },
      "/lexicon": { page: "/lexicon" },
      "/bibliotheca": { page: "/bibliotheca" },
      "/dimensio": { page: "/dimensio" }
    },
    story.sectionsOrder
      .reduce((final, sectionId) => {
        const section = story.sections[sectionId];
        final['section/' + section.id] = {
          page: '/section', 
          query: {
            id: section.id
          }
        };
        return final;
      }, {})
    );
  },
  webpack: (config, { dev }) => {

    // Perform customizations to webpack config
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
          }
        ]
      }
    )
    

    config.node = {
      'fs': 'empty',
      'child_process': 'empty'
    };

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    // if (process.env.NODE_ENV === 'production'){
    //   // remove UglifyJS to use UglifyEs instead
    //   config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
    //   config.plugins.unshift(new UglifyEsPlugin())
    // }
    return config
  },
}