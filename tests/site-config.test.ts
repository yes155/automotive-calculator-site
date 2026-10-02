import { describe, expect, it } from 'vitest';
import { resolveSiteUrl } from '../src/lib/site.mjs';

describe('deployment origin', () => {
  it('leaves an unconfigured preview without a fabricated origin', () => {
    expect(resolveSiteUrl(undefined)).toBeUndefined();
    expect(resolveSiteUrl(' ')).toBeUndefined();
  });
  it('normalizes an HTTPS origin', () => {
    expect(resolveSiteUrl(' https://autocalc.test/ ')).toBe('https://autocalc.test');
  });
  it.each(['http://autocalc.test', 'https://autocalc.test/subpath', 'https://autocalc.test/?q=x',
    'https://autocalc.test/#anchor', 'https://user:password@autocalc.test', 'https://autocalc.example.com',
    'https://your-domain.invalid', 'https://localhost', 'not a URL'])('rejects an unsuitable origin: %s', value => {
    expect(() => resolveSiteUrl(value)).toThrow();
  });
});
