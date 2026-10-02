// One deployment origin for Astro, canonicals, structured data and crawl files.
export function resolveSiteUrl(value) {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
      url.hostname === 'localhost' || url.hostname.endsWith('.invalid') || url.hostname === 'example.com' || url.hostname.endsWith('.example.com')) {
    throw new Error('SITE_URL must be your HTTPS deployment origin, without a path, credentials, query or fragment.');
  }
  return url.origin;
}

export const siteUrl = resolveSiteUrl(process.env.SITE_URL);
export const indexable = Boolean(siteUrl) && process.env.SITE_NOINDEX !== 'true';
