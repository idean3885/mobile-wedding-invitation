import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';

const STATIC_IMAGES = 'static/images';
const QUALITY = 85;

const configs = {
  hero: { width: 1200, suffix: '' },
  gallery: { width: 800, suffix: '' },
  thumb: { width: 400, suffix: '-thumb' }
};

async function optimizeImage(inputPath, outputPath, width) {
  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
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
      await optimizeImage(inputPath, thumbOutput, configs.thumb.width);
    }

    const inputStats = (await sharp(inputPath).metadata());
    const outputStats = (await sharp(mainOutput).metadata());
    console.log(`${file}: ${inputStats.width}x${inputStats.height} → ${outputStats.width}x${outputStats.height} .webp`);
  }

  console.log('\nDone! Check static/images/ for .webp files.');
}

main().catch(console.error);
