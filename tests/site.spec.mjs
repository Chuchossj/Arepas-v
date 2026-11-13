import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['index.html', 'servicios.html', 'qnso.html', 'horarios.html', 'contacto.html'];

for (const path of routes) {
  test(`${path}: complete page, local assets and accessible content`, async ({ page }, testInfo) => {
    const errors = [];
    const failedAssets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() !== 'error') return;
      const source = message.location().url;
      // External font/map availability is not an application JavaScript error.
      if (!source || source.startsWith('http://127.0.0.1:4173')) errors.push(message.text());
    });
    page.on('response', response => {
      if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) {
        failedAssets.push(`${response.status()} ${response.url()}`);
      }
    });

    const response = await page.goto(`/${path}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.site-header .brand img')).toBeVisible();
    await expect(page.locator('.site-header .brand img')).toHaveAttribute('alt', /Tío Nené/);
    await expect(page).toHaveTitle(/Tío Nené/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{40}/);
    await expect(page.locator('#navigation [aria-current="page"]')).toHaveAttribute('href', path);
    await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);

    // Scrolling each image loads below-the-fold assets without disabling lazy loading.
    const images = page.locator('img:visible');
    for (let index = 0; index < await images.count(); index++) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('alt', /\S/);
      await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('iframe')
      .analyze();
    await testInfo.attach('accessibility-results', {
      body: JSON.stringify(accessibility.violations, null, 2),
      contentType: 'application/json',
    });
    expect(accessibility.violations).toEqual([]);
    expect(failedAssets).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('main navigation connects every existing page', async ({ page }) => {
  await page.goto('/');
  for (const path of routes.slice(1).concat(routes[0])) {
    await page.locator(`#navigation a[href="${path}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${path.replace('.', '\\.')}$`));
    await expect(page.locator('main h1')).toBeVisible();
  }
});

test('a nested missing page returns 404 and its navigation reaches the menu', async ({ page }) => {
  const response = await page.goto('/no-existe/ruta-anidada');
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle(/Página no encontrada/);
  await expect(page.locator('main h1')).toBeVisible();
  const menuLink = page.locator('#navigation a[href="/servicios.html"]');
  await expect(menuLink).toBeVisible();
  await menuLink.click();
  await expect(page).toHaveURL(/\/servicios\.html$/);
  await expect(page).toHaveTitle(/Nuestro menú/);
  await expect(page.locator('.menu-grid .product-card')).toHaveCount(10);
});

for (const width of [360, 768, 1440]) {
  test(`all pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(`/${path}`);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(overflow.document, `${path} overflows at ${width}px`).toBeLessThanOrEqual(overflow.viewport + 1);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
}

test('mobile navigation works with keyboard and restores focus on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  const navigation = page.getByRole('navigation', { name: 'Navegación principal' });
  await expect(navigation).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(navigation.locator('a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await navigation.getByRole('link', { name: 'Contacto', exact: true }).click();
  await expect(page).toHaveURL(/\/contacto\.html$/);
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
});

test('hero controls cycle all three arepas and announce selection', async ({ page }) => {
  await page.goto('/');
  const slides = page.locator('[data-slide]');
  await expect(slides.filter({ visible: true })).toHaveCount(1);
  await page.locator('[data-next-slide]').click();
  await expect(page.locator('[data-slide="1"]')).toBeVisible();
  await expect(page.locator('[data-go-slide="1"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-slide-status]')).toContainText('pollo');
  await page.locator('[data-prev-slide]').click();
  await expect(page.locator('[data-slide="0"]')).toBeVisible();
  await page.locator('[data-prev-slide]').click();
  await expect(page.locator('[data-slide="2"]')).toBeVisible();
  await page.locator('[data-go-slide="0"]').click();
  await expect(page.locator('[data-slide="0"]')).toBeVisible();
  await expect(slides.filter({ visible: true })).toHaveCount(1);
});

test('mobile hero responds to horizontal swipes and keeps its main heading available', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  const hero = page.locator('.hero');
  const swipe = async (from, to) => hero.evaluate((element, { from, to }) => {
    const start = new Touch({ identifier: 1, target: element, clientX: from.x, clientY: from.y });
    element.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true, touches: [start], changedTouches: [start],
    }));
    const end = new Touch({ identifier: 1, target: element, clientX: to.x, clientY: to.y });
    element.dispatchEvent(new TouchEvent('touchend', {
      bubbles: true, touches: [], changedTouches: [end],
    }));
  }, { from, to });

  await swipe({ x: 300, y: 500 }, { x: 60, y: 510 });
  await expect(page.locator('[data-slide="1"]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('[data-slide-status]')).toContainText('pollo');

  // Scrolling vertically must not accidentally change the selected arepa.
  await swipe({ x: 180, y: 600 }, { x: 185, y: 300 });
  await expect(page.locator('[data-slide="1"]')).toBeVisible();
  await swipe({ x: 60, y: 500 }, { x: 300, y: 510 });
  await expect(page.locator('[data-slide="0"]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('menu categories support arrow keys, Home and End', async ({ page }) => {
  await page.goto('/#favoritos');
  const tabs = page.getByRole('tab');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('Burrito');
  await page.keyboard.press('End');
  await expect(tabs.nth(2)).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Jugos naturales');
  await expect(page.getByRole('tabpanel')).toContainText('$10.999');
  await expect(page.getByRole('tabpanel')).toContainText('$14.000');
  await expect(page.getByRole('tabpanel')).toContainText('$25.000');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('huevo');
  await expect(page.getByRole('tabpanel').locator('.product-card')).toHaveCount(3);
});

test('contact validates, preserves product context and copies without sending', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const outbound = [];
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) outbound.push(`${request.method()} ${request.url()}`);
  });
  await page.goto('/contacto.html?producto=Arepa%20de%20Queso');
  await expect(page.locator('#message')).toHaveValue('Hola, me gustaría consultar por Arepa de Queso.');
  await page.getByRole('button', { name: 'Preparar mensaje' }).click();
  await expect(page.locator('[data-contact-result]')).toBeHidden();
  await expect(page.locator('#name')).toBeFocused();
  await page.locator('#name').fill('María Pérez');
  await page.locator('#email').fill('maria@example.com');
  await page.getByRole('button', { name: 'Preparar mensaje' }).click();
  await expect(page.locator('[data-contact-result]')).toBeVisible();
  await expect(page.locator('#prepared-message')).toBeFocused();
  await expect(page.locator('#prepared-message')).toHaveValue(/Arepa de Queso\.[\s\S]*María Pérez[\s\S]*maria@example\.com/);
  await expect(page.getByRole('status')).toContainText('aún no se ha enviado');
  await page.getByRole('button', { name: 'Copiar mensaje' }).click();
  await expect(page.getByRole('status')).toContainText('Mensaje copiado');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const prepared = await page.locator('#prepared-message').inputValue();
  expect(copied.replace(/\r\n/g, '\n')).toBe(prepared.replace(/\r\n/g, '\n'));
  expect(outbound).toEqual([]);
});
