import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { publicAssetUrl } = loadApi('src/shared/utils/public-asset-url.ts')
const { visibleStages } = loadApi('src/components/cases/stage-window.ts')
test('public images resolve from the API origin instead of Metro',()=>{
 assert.equal(publicAssetUrl('/public/icons/a.png','http://192.168.10.180:7777'),'http://192.168.10.180:7777/public/icons/a.png')
 assert.equal(publicAssetUrl('https://cdn.example.com/a.png','http://localhost:7777'),'https://cdn.example.com/a.png')
})
test('five stages show a moving window of at most three, including the last stage',()=>{
 const stages=[1,2,3,4,5].map(id=>({id}))
 assert.deepEqual(visibleStages(stages,1).map(x=>x.id),[1,2,3])
 assert.deepEqual(visibleStages(stages,3).map(x=>x.id),[2,3,4])
 assert.deepEqual(visibleStages(stages,5).map(x=>x.id),[3,4,5])
 assert.deepEqual(visibleStages(stages.slice(0,2),2).map(x=>x.id),[1,2])
})
