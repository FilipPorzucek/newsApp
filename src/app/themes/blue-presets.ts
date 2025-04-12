import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyBluePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e7f1ff',
      100: '#c2d9ff',
      200: '#99beff',
      300: '#70a3ff',
      400: '#4e8eff',
      500: '#2c7aff', 
      600: '#2670f1',
      700: '#1f63df',
      800: '#1857cd',
      900: '#0d41b0'
    }
  }
});

export default MyBluePreset;