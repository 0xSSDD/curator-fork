import { mergeConfig } from 'vitest/config';
import shared from '../../vitest.shared.js';

export default mergeConfig(shared, {
  test: {
    globals: false,
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    setupFiles: ['./setupTests.ts'],
    testTimeout: 30000,
  },
});
