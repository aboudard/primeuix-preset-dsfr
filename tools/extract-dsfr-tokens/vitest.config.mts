import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/tools/extract-dsfr-tokens',
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'extract-dsfr-tokens',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/tools/extract-dsfr-tokens',
      provider: 'v8' as const,
    },
  },
}));
