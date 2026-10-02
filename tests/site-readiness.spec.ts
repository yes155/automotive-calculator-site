import { test, expect } from '@playwright/test';

const cases = [
  { id: 'wheel-offset', field: 'newWidthIn', value: '10', expected: 'Inner edge moves 35.4 mm closer to the suspension; outer edge moves 15.4 mm outward toward the fender.' },
  { id: 'compression-ratio', field: 'bore', value: '90', expected: '10.07:1' },
  { id: 'engine-displacement', field: 'bore', value: '90', expected: '2188 cc (2.19 L, 133.5 cu in)' },
  { id: 'horsepower', field: 'torque', value: '500', expected: '571.2 hp (425.9 kW)' },
  { id: 'fuel-injector', field: 'horsepower', value: '500', expected: '787 cc/min (78.1 lb/hr)' },
  { id: 'power-to-weight', field: 'power', value: '400', expected: '0.1333 hp/lb' },
  { id: 'quarter-mile', field: 'horsepower', value: '500', expected: '11.14s @ 122.3 MPH' },
  { id: 'tire-size', field: 'tireBWidth', value: '245', expected: '+18.9 mm (+3.0%)' },
];

for (const example of cases) {
  test(`${example.id}: shared input links restore results and reset without navigation`, async ({ page }) => {
    await page.goto(`/calculators/${example.id}/`);
    const original = await page.locator('.result-value').textContent();
    const defaultValue = await page.locator(`[name="${example.field}"]`).inputValue();
    await page.locator(`[name="${example.field}"]`).fill(example.value);
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.locator('.result-value')).toHaveText(example.expected);
    expect(new URL(page.url()).searchParams.get(example.field)).toBe(example.value);
    await page.reload();
    await expect(page.locator(`[name="${example.field}"]`)).toHaveValue(example.value);
    await expect(page.locator('.result-value')).toHaveText(example.expected);
    await page.locator(`[name="${example.field}"]`).fill('');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    const navigations: string[] = [];
    page.on('request', request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations.push(request.url()); });
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.locator(`[name="${example.field}"]`)).toHaveValue(defaultValue);
    await expect(page.locator('.result-value')).toHaveText(original!);
    await expect(page.locator('.calculator-error-summary')).toBeHidden();
    expect(new URL(page.url()).search).toBe('');
    expect(navigations).toEqual([]);
  });
}

test('metric URL values are restored once and reset restores imperial units and bounds', async ({ page }) => {
  await page.goto('/calculators/power-to-weight/?power=223.7099616&powerUnit=kw&weight=1360.77711&weightUnit=kg');
  await expect(page.locator('.result-value')).toHaveText('0.1000 hp/lb');
  await expect(page.locator('[name="weightUnit"]')).toHaveValue('kg');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('[name="weight"]')).toHaveValue('3000');
  await expect(page.locator('[name="weightUnit"]')).toHaveValue('lb');
  await expect(page.locator('.result-value')).toHaveText('0.1000 hp/lb');
  await page.locator('[name="weightUnit"]').selectOption('kg');
  expect(Number(await page.locator('[name="weight"]').inputValue())).toBeCloseTo(1360.77711, 5);
  await expect(page.locator('.result-value')).toHaveText('0.1000 hp/lb');
});

test('inch URL values respect converted bounds', async ({ page }) => {
  await page.goto('/calculators/engine-displacement/?bore=3.38582677165&stroke=3.38582677165&cylinders=4&unitSystem=in');
  await expect(page.locator('.result-value')).toHaveText('1998 cc (2.00 L, 121.9 cu in)');
  await expect(page.locator('[name="unitSystem"][value="in"]')).toBeChecked();
});

test('bad URL values explain the problem and reset recovers', async ({ page }) => {
  await page.goto('/calculators/horsepower/?torque=abc&rpm=6000');
  await expect(page.locator('.calculator-error-summary')).toContainText('must be a number');
  await expect(page.locator('.result-panel')).toBeHidden();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('.result-value')).toHaveText('457.0 hp (340.8 kW)');
  await page.goto('/calculators/horsepower/?torqueUnit=unsupported');
  await expect(page.locator('.calculator-error-summary')).toContainText('unsupported unit');
  await expect(page.locator('.result-panel')).toBeHidden();
});

test('all sitemap pages have working links, unique metadata, and a usable 320px layout', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  expect(paths).toHaveLength(22);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 320, height: 720 });
  for (const path of paths) {
    await test.step(path, async () => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('h1')).toHaveCount(1);
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(titles.has(title)).toBeFalsy();
      expect(descriptions.has(description!)).toBeFalsy();
      titles.add(title); descriptions.add(description!);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://autocalc.test${path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      const links = await page.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
      for (const href of new Set(links.filter(href => href.startsWith('/') || href.startsWith('#')))) {
        expect(href).not.toBe('#');
        const target = new URL(href, `http://127.0.0.1:4323${path}`);
        expect((await request.get(target.pathname)).ok(), `${path} links to ${href}`).toBeTruthy();
        if (target.hash) {
          const html = await (await request.get(target.pathname)).text();
          expect(html).toContain(`id="${target.hash.slice(1)}"`);
        }
      }
      for (const script of await page.locator('script[type="application/ld+json"]').all()) {
        const schema = JSON.parse((await script.textContent())!);
        expect(JSON.stringify(schema)).not.toContain('SearchAction');
        expect(JSON.stringify(schema)).not.toContain('example.com');
        if (path.startsWith('/guides/') && path !== '/guides/' && schema['@type'] === 'Article') expect(schema.mainEntityOfPage['@id']).toBe(`https://autocalc.test${path}`);
      }
      if (path.startsWith('/calculators/') && path !== '/calculators/') {
        for (const button of await page.locator('.form-actions button').all()) expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        await page.getByRole('button', { name: 'Calculate', exact: true }).click();
        await expect(page.locator('.result-panel')).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Sitemap: https://autocalc.test/sitemap.xml');
});
