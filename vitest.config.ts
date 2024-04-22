import { defineConfig, configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    include: ['./tests/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude, 'postgres'],
    coverage: {
      exclude: [...configDefaults.coverage.exclude!, 'postgres'],
    },
  },
  plugins: [tsconfigPaths()],
});
