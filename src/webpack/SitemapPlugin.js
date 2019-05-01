const SitemapPlugin = require('sitemap-webpack-plugin').default;

const now = new Date();
const dd = now.getDate();
const mm = now.getMonth() + 1;
const yyyy = now.getFullYear();
const today = `${yyyy}-${mm}-${dd}`;

const paths = [
  {
    path: 'index.html',
    lastMod: today,
    priority: '1',
    changeFreq: 'monthly'
  }
];
const site = 'https://foo-imager.ga';

module.exports = new SitemapPlugin(site, paths);
