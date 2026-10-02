import { siteUrl, indexable } from '../lib/site.mjs';

export function GET() {
  const routes = Object.keys(import.meta.glob('./**/*.astro'))
    .filter(path => !path.endsWith('/404.astro'))
    .map(path => path.replace(/^\.\//, '/').replace(/index\.astro$/, '').replace(/\.astro$/, '/'))
    .sort();
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const urls = indexable ? routes.map(route => `<url><loc>${escape(new URL(route, siteUrl).href)}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
