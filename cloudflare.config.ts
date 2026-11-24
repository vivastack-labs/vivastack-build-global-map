import { defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'global-map',
    compatibilityDate: '2026-11-22',
    workersDev: true,
    previewUrls: false,
    assets: {
      htmlHandling: 'none',
      notFoundHandling: 'none',
    },
  },
});
