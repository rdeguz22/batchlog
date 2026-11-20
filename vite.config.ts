import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site at /batchlog/.
  base: '/batchlog/',
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
