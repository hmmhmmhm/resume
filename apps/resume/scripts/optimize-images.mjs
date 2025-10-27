#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir, copyFile, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Image size configurations based on the performance report
// Using 2x resolution for retina displays
const IMAGE_CONFIGS = {
  'aka-browser.webp': { width: 1448, height: 940, quality: 80 }, // Display: 724x470
  'mugunghwa.webp': { width: 600, height: 840, quality: 80 }, // Display: 300x420
  'hamin.webp': { width: 568, height: 644, quality: 80 }, // Display: 284x322
  'ground-codes.webp': { width: 1448, height: 992, quality: 80 }, // Display: 724x496
  'friday.webp': { width: 1448, height: 992, quality: 80 }, // Display: 724x496
  'post-run.webp': { width: 1448, height: 992, quality: 80 }, // Display: 724x496
  'police.webp': { width: 184, height: 184, quality: 85 }, // Display: 92x92
};

const publicDir = join(__dirname, '..', 'public', 'image');
const backupDir = join(__dirname, '..', 'public', 'image-backup');

async function ensureBackupDir() {
  if (!existsSync(backupDir)) {
    await mkdir(backupDir, { recursive: true });
  }
}

async function optimizeImage(filename, config) {
  const inputPath = join(publicDir, filename);
  const backupPath = join(backupDir, filename);
  const tempPath = join(publicDir, filename + '.tmp');

  if (!existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${filename} - file not found`);
    return;
  }

  try {
    // Backup original if not already backed up
    if (!existsSync(backupPath)) {
      await copyFile(inputPath, backupPath);
      console.log(`💾 Backed up original to: ${backupPath}`);
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`\n📸 Processing ${filename}:`);
    console.log(`   Original: ${metadata.width}x${metadata.height}`);
    console.log(`   Target: ${config.width}x${config.height}`);

    // Only optimize if the image is larger than target
    if (metadata.width <= config.width && metadata.height <= config.height) {
      console.log(`   ✅ Already optimized, skipping`);
      return;
    }

    // Create optimized version
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ 
        quality: config.quality || 85, 
        effort: 6,
        smartSubsample: true,
      })
      .toFile(tempPath);

    // Get file sizes
    const originalBuffer = await sharp(inputPath).toBuffer();
    const optimizedBuffer = await sharp(tempPath).toBuffer();
    const originalSize = originalBuffer.length;
    const optimizedSize = optimizedBuffer.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    // Replace original with optimized
    await unlink(inputPath);
    await copyFile(tempPath, inputPath);
    await unlink(tempPath);

    const newMetadata = await sharp(inputPath).metadata();
    console.log(`   ✅ Optimized: ${newMetadata.width}x${newMetadata.height}`);
    console.log(`   💾 Size: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB`);
    console.log(`   📉 Reduction: ${savings}%`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log('📁 Working directory:', publicDir);
  console.log('');

  await ensureBackupDir();

  for (const [filename, config] of Object.entries(IMAGE_CONFIGS)) {
    await optimizeImage(filename, config);
  }

  console.log('\n✨ Image optimization complete!');
  console.log(`📦 Original images backed up to: ${backupDir}`);
}

main().catch(console.error);
