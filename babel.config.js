const testConfig = {
  'presets': [
    ['env', { 'modules': false }]
  ],
  'env': {
    'test': {
      'presets': [
        ['env', { 'targets': { 'node': 'current' } }]
      ]
    }
  }
};

const buildConfig = {
  presets: [
    '@vue/app'
  ]
};

module.exports = process.env.BABEL_ENV === 'test' ? testConfig : buildConfig;
