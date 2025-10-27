import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [
  'nuxt',
  'mobx',
  'redux',
  'nestjs',
  'express',
  'prisma',
  'drizzle',
  'postgresql',
  'mysql',
  'supabase',
  'docker',
  'vercel',
  'cloudflare',
  'electron',
  'webrtc',
  'onnx',
  'python',
  'streamlit',
  'git',
  'rive',
  'astro',
  'expo',
];

const outputDir = path.join(__dirname, '..', 'public', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadIcon(iconName) {
  const url = `https://cdn.simpleicons.org/${iconName}`;
  const outputPath = path.join(outputDir, `${iconName}.svg`);

  // Skip if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⊘ Skipped ${iconName}.svg (already exists)`);
    return;
  }

  try {
    console.log(`Downloading ${iconName}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const svgContent = await response.text();
    fs.writeFileSync(outputPath, svgContent);
    console.log(`✓ Downloaded ${iconName}.svg`);
  } catch (error) {
    console.error(`✗ Failed to download ${iconName}:`, error.message);
  }
}

async function downloadAllIcons() {
  console.log('Starting icon download...\n');
  
  for (const icon of icons) {
    await downloadIcon(icon);
  }
  
  console.log('\n✓ All icons downloaded successfully!');
}

downloadAllIcons();
