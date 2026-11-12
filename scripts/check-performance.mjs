import { gzipSync } from 'node:zlib';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const assetsDir = join(process.cwd(), 'dist', 'assets');
const files = await readdir(assetsDir);
const javascript = files.filter(file => file.endsWith('.js'));
if (javascript.length === 0) {
  throw new Error('No JavaScript build assets found. Run npm run build first.');
}

const reports = await Promise.all(javascript.map(async file => {
  const content = await readFile(join(assetsDir, file));
  return {
    file,
    bytes: content.byteLength,
    gzipBytes: gzipSync(content).byteLength,
  };
}));

const entry = reports.find(report => report.file.startsWith('index-'));
if (!entry) throw new Error('Could not identify the application entry chunk.');
if (entry.gzipBytes > 170 * 1024) {
  throw new Error(`Initial JavaScript exceeds the 170 KiB gzip budget: ${entry.file}`);
}

console.table(reports.sort((a, b) => b.bytes - a.bytes).map(report => ({
  file: report.file,
  KiB: (report.bytes / 1024).toFixed(1),
  gzipKiB: (report.gzipBytes / 1024).toFixed(1),
})));
console.log(`Initial entry: ${entry.file} (${(entry.gzipBytes / 1024).toFixed(1)} KiB gzip)`);
