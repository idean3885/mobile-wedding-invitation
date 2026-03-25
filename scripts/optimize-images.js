#!/usr/bin/env node
/**
 * Image optimization script using sharp.
 * Converts wedding photos to WebP format for web delivery.
 *
 * Usage: node scripts/optimize-images.js
 *
 * Output:
 *   - hero.webp          : 1200px wide, WebP 85%
 *   - gallery-XX.webp    : 800px wide, WebP 85%
 *   - gallery-XX-thumb.webp : 400px wide, WebP 85%
 *
 * hero.jpg is kept as-is for OG image compatibility.
 * Skips files that already exist.
 */

import sharp from 'sharp';
import { existsSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '..', 'static', 'images');
const QUALITY = 85;

async function processHero() {
  const input = join(IMAGES_DIR, 'hero.jpg');
  const output = join(IMAGES_DIR, 'hero.webp');

  if (!existsSync(input)) {
    console.log('  [skip] hero.jpg not found');
    return;
  }

  if (existsSync(output)) {
    console.log('  [skip] hero.webp already exists');
    return;
  }

  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  console.log('  [done] hero.webp');
}

async function processGallery() {
  const files = readdirSync(IMAGES_DIR);
  const originals = files.filter((f) => {
    const lower = f.toLowerCase();
    return (
      (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) &&
      lower.startsWith('gallery-') &&
      !lower.includes('-thumb')
    );
  });

  if (originals.length === 0) {
    console.log('  [skip] no gallery source JPGs found');
    return;
  }

  for (const file of originals.sort()) {
    const name = basename(file, extname(file)).toLowerCase();
    const inputPath = join(IMAGES_DIR, file);
    const fullOutput = join(IMAGES_DIR, `${name}.webp`);
    const thumbOutput = join(IMAGES_DIR, `${name}-thumb.webp`);

    if (existsSync(fullOutput)) {
      console.log(`  [skip] ${name}.webp already exists`);
    } else {
      await sharp(inputPath)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(fullOutput);
      console.log(`  [done] ${name}.webp`);
    }

    if (existsSync(thumbOutput)) {
      console.log(`  [skip] ${name}-thumb.webp already exists`);
    } else {
      await sharp(inputPath)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(thumbOutput);
      console.log(`  [done] ${name}-thumb.webp`);
    }
  }
}

async function main() {
  console.log('Optimizing images...');
  console.log('');
  console.log('Hero:');
  await processHero();
  console.log('');
  console.log('Gallery:');
  await processGallery();
  console.log('');
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
