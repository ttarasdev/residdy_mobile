import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { partnerText, partnerWebUrl } = loadApi(new URL('../src/components/partners/partner-content.ts', import.meta.url))

test('partner descriptions use Ukrainian API suffix and Polish fallback', () => {
    const info = { descriptionUa: 'Опис', descriptionPl: 'Opis', descriptionEn: '  ' }
    assert.equal(partnerText(info, 'description', 'UA'), 'Опис')
    assert.equal(partnerText(info, 'description', 'EN'), 'Opis')
    assert.equal(partnerText(null, 'description', 'PL'), '')
})

test('partner web links accept domains and reject executable and credential URLs', () => {
    assert.equal(partnerWebUrl('atlantis.info.pl'), 'https://atlantis.info.pl/')
    assert.equal(partnerWebUrl('https://instagram.com/company'), 'https://instagram.com/company')
    for (const input of ['javascript:alert(1)', 'file:///tmp/test', 'https://user:pass@example.com', '', null]) {
        assert.equal(partnerWebUrl(input), null)
    }
})
