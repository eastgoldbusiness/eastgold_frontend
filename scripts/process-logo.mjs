// One-off asset script: trims the black background from the EastGold logo and
// clips it to a clean, transparent circular medallion for premium rendering.
// Usage: node scripts/process-logo.mjs "<source.png>" "public/east-gold-logo.png"
import { readFileSync, writeFileSync } from 'node:fs'
import { PNG } from 'pngjs'

const [, , srcPath, outPath] = process.argv
if (!srcPath || !outPath) {
  console.error('Usage: node scripts/process-logo.mjs <source.png> <out.png>')
  process.exit(1)
}

const src = PNG.sync.read(readFileSync(srcPath))
const { width, height, data } = src

// 1) Find the bounding box of the bright (non-black) medallion pixels.
const BRIGHT = 100 // ignore faint background noise; gold/cream are well above this
let minX = width
let minY = height
let maxX = 0
let maxY = 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4
    const a = data[i + 3]
    const max = Math.max(data[i], data[i + 1], data[i + 2])
    if (a > 10 && max > BRIGHT) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

// 2) Make the crop square and centred on the medallion.
const cx = (minX + maxX) / 2
const cy = (minY + maxY) / 2
const size = Math.max(maxX - minX + 1, maxY - minY + 1)
const left = Math.round(cx - size / 2)
const top = Math.round(cy - size / 2)

// 3) Copy the square crop, making everything outside the inscribed circle
//    transparent (with a soft 1px feather for a crisp, non-jagged edge).
const out = new PNG({ width: size, height: size })
const radius = size / 2
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const oi = (y * size + x) * 4
    const dist = Math.hypot(x + 0.5 - radius, y + 0.5 - radius)
    const edge = radius - dist
    let alpha
    if (edge >= 1) alpha = 255
    else if (edge <= -1) alpha = 0
    else alpha = Math.round(((edge + 1) / 2) * 255)

    const sx = left + x
    const sy = top + y
    if (alpha > 0 && sx >= 0 && sx < width && sy >= 0 && sy < height) {
      const si = (sy * width + sx) * 4
      out.data[oi] = data[si]
      out.data[oi + 1] = data[si + 1]
      out.data[oi + 2] = data[si + 2]
      out.data[oi + 3] = alpha
    } else {
      out.data[oi] = 0
      out.data[oi + 1] = 0
      out.data[oi + 2] = 0
      out.data[oi + 3] = 0
    }
  }
}

writeFileSync(outPath, PNG.sync.write(out))
console.log(`Wrote ${outPath} (${size}x${size}) from bbox ${minX},${minY}–${maxX},${maxY}`)
