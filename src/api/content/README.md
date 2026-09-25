# Instruction media

`contentApi.getInstruction(id, { baseUrl, token, signal })` returns the current instruction contract. New covers use `headerVariantId` / `headerVariant` (private variant). A legacy `headerIconId` is a public asset ID and must never be passed to getVariant.

`getVariant` provides small/medium/large asset IDs. `downloadImage(assetId, options)` reads an authenticated Blob. Select medium or large for a cover and small for thumbnails; keep the bearer token out of public image URLs. Existing subscription requirements for instruction content still apply.

Blocks are ordered by sortKey: text uses contentJson, photo uses variantId. Dedicated buckets are instruction_headers and instruction_images; blog covers use blog_images. The mobile client only reads content; managers prepare it in CRM.
