import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { bannerContent, bannerLink, isBannerVisible } = loadApi(new URL('../src/components/advertising/banner-content.ts', import.meta.url))
test('banner content maps Ukrainian API fields and falls back to Polish', () => {
    const banner = { titlePl: 'Pobyt', subtitlePl: 'Opis', titleUa: 'Перебування', subtitleUa: 'Опис', titleEn: ' ', subtitleEn: '' }
    assert.deepEqual(bannerContent(banner, 'uk'), { title: 'Перебування', subtitle: 'Опис' })
    assert.deepEqual(bannerContent(banner, 'en'), { title: 'Pobyt', subtitle: 'Opis' })
})
test('banner links only open normal HTTP(S) destinations', () => {
    assert.equal(bannerLink('https://atlantis.info.pl/pl/offers'), 'https://atlantis.info.pl/pl/offers')
    for (const link of ['javascript:alert(1)', 'file:///tmp/a', 'https://name:secret@example.com', 'broken']) assert.equal(bannerLink(link), null)
})
test('impression visibility excludes ads below the fold and beneath the sticky header', () => {
    assert.equal(isBannerVisible(600, 120, 70, 500), false)
    assert.equal(isBannerVisible(600, 120, 170, 500), true)
    assert.equal(isBannerVisible(0, 120, 70, 500), false)
    assert.equal(isBannerVisible(0, 120, 0, 0), false)
})
