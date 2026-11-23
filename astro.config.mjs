// @ts-check
import { defineConfig } from 'astro/config';

// Site estático: tudo vira HTML na hora do build.
// Os idiomas são resolvidos pelas rotas em src/pages/[...lang]/ (pt sem prefixo; /es, /en, /fr).
export default defineConfig({
  site: 'https://estudoscomparados.unb.br',
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
