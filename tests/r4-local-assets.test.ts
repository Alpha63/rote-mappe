import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { templates } from '../src/utils/pdfTemplates';
import { StandardFonts } from 'pdf-lib';

describe('R4: Local Assets — index.html CDN & Font Isolation', () => {
  const indexPath = path.resolve(__dirname, '../index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  it('contains zero external CDN or external font links in index.html', () => {
    const prohibitedCDNs = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdnjs.cloudflare.com',
      'cdn.jsdelivr.net',
      'unpkg.com',
      'ajax.googleapis.com',
      'use.typekit.net',
      'fontawesome.com',
    ];

    prohibitedCDNs.forEach((cdn) => {
      expect(indexHtml.includes(cdn), `index.html contains prohibited CDN: ${cdn}`).toBe(false);
    });
  });

  it('does not contain any remote http or https resource links in index.html', () => {
    // Matches <link href="http..." or <script src="http..."
    const remoteLinkRegex = /<(link|script)[^>]+(href|src)=["']https?:\/\/[^"']+["']/gi;
    const matches = indexHtml.match(remoteLinkRegex);
    expect(matches).toBeNull();
  });

  it('only references local icons and manifest', () => {
    expect(indexHtml).toContain('href="/icon.svg"');
    expect(indexHtml).toContain('href="/manifest.webmanifest"');
    expect(indexHtml).toContain('src="/src/main.tsx"');
  });
});

describe('R4: Local Assets — src/index.css Local Font Stack', () => {
  const cssPath = path.resolve(__dirname, '../src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  it('contains zero remote URLs or external font imports in index.css', () => {
    const remoteUrlRegex = /url\(["']?https?:\/\/[^"')]+["']?\)/gi;
    const matches = cssContent.match(remoteUrlRegex);
    expect(matches).toBeNull();

    const remoteImportRegex = /@import\s+["']https?:\/\/[^"']+["']/gi;
    const importMatches = cssContent.match(remoteImportRegex);
    expect(importMatches).toBeNull();
  });

  it('uses standard system font stack for typography', () => {
    expect(cssContent).toContain('font-family:');
    expect(cssContent).toMatch(/-apple-system,\s*BlinkMacSystemFont,\s*"Segoe UI",\s*Roboto,\s*Helvetica,\s*Arial,\s*sans-serif/);
  });
});

describe('R4: Local Assets — PDF Templates StandardFonts Usage', () => {
  it('uses built-in StandardFonts (Helvetica) across all template themes', () => {
    const templateKeys = Object.keys(templates);
    expect(templateKeys.length).toBeGreaterThanOrEqual(3);

    templateKeys.forEach((key) => {
      const tpl = templates[key];
      expect(tpl.fonts.regular).toBe(StandardFonts.Helvetica);
      expect(tpl.fonts.bold).toBe(StandardFonts.HelveticaBold);
      if (tpl.fonts.italic) {
        expect(tpl.fonts.italic).toBe(StandardFonts.HelveticaOblique);
      }
      if (tpl.fonts.boldItalic) {
        expect(tpl.fonts.boldItalic).toBe(StandardFonts.HelveticaBoldOblique);
      }
    });
  });
});
