// @ts-check
import { defineConfig } from 'astro/config';
import { siteUrl } from './src/lib/site.mjs';

// https://astro.build/config
export default defineConfig({ site: siteUrl, output: 'static', trailingSlash: 'always' });
