module.exports = {
  content: [
    'App.js',
    './screens//*.{html,js}',
    './components//*.{html,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
