const { getDefaultConfig } = require('@expo/metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname)

  return {
    resolver: {
      sourceExts: [...sourceExts, 'cjs', 'mjs'],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  }
})()
