const path = require('path');
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@src': 'src',
          '@actions': './src/actions',
          '@animations': './src/animations',
          '@apis': './src/api',
          '@assets': './src/assets',
          '@classes': './src/class',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@data': './src/data',
          '@hooks': './src/hooks',
          '@images': './src/assets/images',
          '@modals': './src/modals',
          '@models': './src/models',
          '@security': 'src/security',
          '@services': './src/services',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@stores': './src/stores',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
          lib_actions: '../lib/lib-react-native/src/actions',
          lib_animations: '../lib/lib-react-native/src/animations',
          lib_api: '../lib/lib-react-native/src/api',
          lib_assets: './src/assets',
          lib_constants: '../lib/lib-react-native/src/constants',
          lib_contexts: '../lib/lib-react-native/src/contexts',
          lib_class: '../lib/lib-react-native/src/class',
          lib_cloud: '../lib/lib-react-native/src/cloud',
          lib_components: '../lib/lib-react-native/src/components',
          lib_core: '../lib/lib-react-native/src/core',
          lib_data: '../lib/lib-react-native/src/data',
          lib_forms: '../lib/lib-react-native/src/forms',
          lib_form_components: '../lib/lib-react-native/src/forms/components',
          lib_hooks: '../lib/lib-react-native/src/hooks',
          lib_helpers: '../lib/lib-react-native/src/helpers',
          lib_images: '../lib/lib-react-native/src/assets/images',
          lib_mocks: '../lib-reactnative/src/mocks',
          lib_models: '../lib/lib-react-native/src/models',
          lib_modals: '../lib/lib-react-native/src/modals',
          lib_navigation: '../lib/lib-react-native/src/navigation',
          lib_screens: '../lib/lib-react-native/src/screens',
          lib_services: '../lib/lib-react-native/src/services',
          lib_stores: '../lib/lib-react-native/src/stores',
          lib_styles: '../lib/lib-react-native/src/styles',
          lib_types: '../lib/lib-react-native/src/types',
          lib_utils: '../lib/lib-react-native/src/utils',
          israel_calendar: '../lib/israel-calendar/src',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
