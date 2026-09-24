import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
    },
  },
  test: {
    globals: true,
    // The apro-clinica spec spies on `document.getElementById` to drive
    // scrollTo. Without restoreMocks that spy leaks into every later spec in
    // the file, and Angular can no longer find its own test root, so
    // createComponent fails with NG05104.
    restoreMocks: true,
  },
});
