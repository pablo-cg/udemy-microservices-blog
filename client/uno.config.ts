// uno.config.ts
import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      dark: '#121212',
      light: '#C9CED6',
      'nuxt-green': '#00dc82',
    },
  },
});
