import { rgb, StandardFonts, Color } from 'pdf-lib';

export interface TemplateConfig {
  name: string;
  colors: {
    primary: Color;
    primaryText: Color;
    secondaryText: Color;
    accent: Color;
    text: Color;
    lightText: Color;
    tableHeaderBg: Color;
    tableHeaderText: Color;
    tableEvenRowBg: Color;
    chapterCoverBg: Color;
    chapterCoverText: Color;
    warning: Color;
  };
  fonts: {
    regular: StandardFonts;
    bold: StandardFonts;
    italic?: StandardFonts;
    boldItalic?: StandardFonts;
    serif?: StandardFonts;
  };
}

export const templates: Record<string, TemplateConfig> = {
  'default': {
    name: 'Standard (Blau)',
    colors: {
      primary: rgb(0.18, 0.22, 0.35),
      primaryText: rgb(1, 1, 1),
      secondaryText: rgb(0.7, 0.7, 0.8),
      accent: rgb(0.3, 0.35, 0.5),
      text: rgb(0.2, 0.2, 0.2),
      lightText: rgb(0.4, 0.4, 0.4),
      tableHeaderBg: rgb(0.9, 0.9, 0.95),
      tableHeaderText: rgb(0.18, 0.22, 0.35),
      tableEvenRowBg: rgb(0.97, 0.97, 0.97),
      chapterCoverBg: rgb(0.94, 0.95, 0.97),
      chapterCoverText: rgb(0.18, 0.22, 0.35),
      warning: rgb(0.8, 0.1, 0.1),
    },
    fonts: { 
      regular: StandardFonts.Helvetica, 
      bold: StandardFonts.HelveticaBold,
      italic: StandardFonts.HelveticaOblique,
      boldItalic: StandardFonts.HelveticaBoldOblique
    }
  },
  'rot': {
    name: 'Klassisch (Rot)',
    colors: {
      primary: rgb(0.6, 0.1, 0.1),
      primaryText: rgb(1, 1, 1),
      secondaryText: rgb(0.8, 0.7, 0.7),
      accent: rgb(0.7, 0.2, 0.2),
      text: rgb(0.2, 0.2, 0.2),
      lightText: rgb(0.4, 0.4, 0.4),
      tableHeaderBg: rgb(0.95, 0.9, 0.9),
      tableHeaderText: rgb(0.6, 0.1, 0.1),
      tableEvenRowBg: rgb(0.99, 0.97, 0.97),
      chapterCoverBg: rgb(0.99, 0.96, 0.96),
      chapterCoverText: rgb(0.6, 0.1, 0.1),
      warning: rgb(0.8, 0.1, 0.1),
    },
    fonts: { 
      regular: StandardFonts.Helvetica, 
      bold: StandardFonts.HelveticaBold,
      italic: StandardFonts.HelveticaOblique,
      boldItalic: StandardFonts.HelveticaBoldOblique
    }
  },
  'modern': {
    name: 'Modern & Edel',
    colors: {
      primary: rgb(0.13, 0.15, 0.18), // Deep elegant charcoal
      primaryText: rgb(1, 1, 1),
      secondaryText: rgb(0.55, 0.55, 0.6),
      accent: rgb(0.72, 0.55, 0.35), // Elegant bronze/gold accent
      text: rgb(0.2, 0.2, 0.22),
      lightText: rgb(0.45, 0.45, 0.48),
      tableHeaderBg: rgb(0.96, 0.96, 0.97),
      tableHeaderText: rgb(0.13, 0.15, 0.18),
      tableEvenRowBg: rgb(0.98, 0.98, 0.99),
      chapterCoverBg: rgb(0.97, 0.97, 0.98),
      chapterCoverText: rgb(0.13, 0.15, 0.18),
      warning: rgb(0.85, 0.25, 0.25),
    },
    fonts: { 
      regular: StandardFonts.Helvetica, 
      bold: StandardFonts.HelveticaBold,
      italic: StandardFonts.HelveticaOblique,
      boldItalic: StandardFonts.HelveticaBoldOblique
    }
  }
};
