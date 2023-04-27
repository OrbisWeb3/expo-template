module.exports = {
plugins: [
[
'module-resolver',
{
alias: {
'crypto': 'react-native-webcrypto',
'stream': 'stream-browserify',
'buffer': '@craftzdog/react-native-buffer'
},
},
],
],
presets: [['module:metro-react-native-babel-preset', {
unstable_disableES6Transforms: true
}]],
}
