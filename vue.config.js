const SitemapPlugin = require('./src/webpack/SitemapPlugin');

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    plugins: [
      SitemapPlugin
    ]
  }
};
