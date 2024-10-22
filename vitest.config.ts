import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'tests/unit/**/*.test.{js,ts}', 
      'tests/api/**/*.test.{js,ts}',
      'tests/ui/**/*.test.{js,ts}' 
    ],
    globals: true,
    environment: 'node',
  },
});
