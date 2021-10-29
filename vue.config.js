const path = require('path')

module.exports = {
  publicPath: '/',
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
