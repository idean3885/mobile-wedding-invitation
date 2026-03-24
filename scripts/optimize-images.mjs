import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';

const STATIC_IMAGES = 'static/images';
const QUALITY = 95;
const THUMB_QUALITY = 85;

const configs = {
  hero: { width: 3000 },
  gallery: { width: 2000 },
  thumb: { width: 600 }
};

async function optimizeImage(inputPath, outputPath, width, quality = QUALITY) {
  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);
}

async function main() {
  const files = readdirSync(STATIC_IMAGES).filter(f => f.endsWith('.jpg'));

  for (const file of files) {
    const inputPath = join(STATIC_IMAGES, file);
    const { name } = parse(file);
    const isHero = name === 'hero';

    // Main optimized version
    const mainWidth = isHero ? configs.hero.width : configs.gallery.width;
    const mainOutput = join(STATIC_IMAGES, `${name}.webp`);
    await optimizeImage(inputPath, mainOutput, mainWidth);

    // Thumbnail for gallery images only
    if (!isHero && !name.includes('placeholder') && !name.includes('qr')) {
      const thumbOutput = join(STATIC_IMAGES, `${name}-thumb.webp`);
      await optimizeImage(inputPath, thumbOutput, configs.thumb.width, THUMB_QUALITY);
    }

    const inputStats = (await sharp(inputPath).metadata());
    const outputStats = (await sharp(mainOutput).metadata());
    console.log(`${file}: ${inputStats.width}x${inputStats.height} → ${outputStats.width}x${outputStats.height} .webp`);
  }

  console.log('\nDone! Check static/images/ for .webp files.');
}

main().catch(console.error);
