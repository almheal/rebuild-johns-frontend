const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    // test after created another pages
    // config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@elements': path.resolve(__dirname, 'src/components/elements'),
        '@icons': path.resolve(__dirname, 'src/components/icons'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@const': path.resolve(__dirname, 'src/const'),
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsOptions: { source: false },
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
        `,
      },
    },
  },
}
