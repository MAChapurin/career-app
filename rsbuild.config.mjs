import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Career App',
  },
  source: {
    alias: {
      '@components': './src/components',
      '@constants': './src/constants',
      '@hooks': './src/hooks',
      '@utils': './src/utils',
      '@store': './src/store',
      '@pages': './src/pages',
    },
  },
});
