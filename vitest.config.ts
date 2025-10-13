import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['./packages/*', './apps/curator-backend', './apps/curator-frontend'],
  },
});
