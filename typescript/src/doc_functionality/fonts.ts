// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Types

export interface FontResource {
  url: string
  fontProperties: {
    family: string
    weight: number | string
    isItalic: boolean
  }
}

export interface FontFamilyToken {
  tokenType: "FontFamily"
  value: {
    text: string
  }
}

export interface TypographyToken {
  tokenType: "Typography"
  value: {
    fontFamily: {
      text: string
    }
    fontWeight: {
      text: string
    }
  }
}

export interface GoogleFontsResponse {
  kind: string
  items: Array<{
    family: string
    variants: string[]
    files: Record<string, string>
    kind?: string
    subsets?: string[]
    version?: string
    lastModified?: string
    category?: string
  }>
}

export interface FontLoadingDefinition {
  family: string
  sources: {
    url: string
    weight: number | string
    style: "normal" | "italic"
    format: string
    source: "designSystem" | "google"
  }[]
}

export interface Brand {
    id: string
    persistentId: string
    name: string
    description: string
  }

/** Returns the default brand based on predefined rules — just because Supernova doesn't have a concept of a default brand*/
export function getDefaultBrand(brands: Record<string, Brand>): Brand {
const brandArray = Object.values(brands)

// First try to find a brand named "Default"
const defaultBrand = brandArray.find(brand => brand.name === "Default")
if (defaultBrand) {
    return defaultBrand
}

// Otherwise sort alphabetically and return first
return brandArray.sort((a, b) => a.name.localeCompare(b.name))[0]
}
  

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Font Processing

/** Extract unique font families from design tokens */
export function extractFontFamiliesFromTokens(tokens: Token[]): { family: string; variants: string[] }[] {
    const fontFamilyMap = new Map<string, Set<string>>();
  
    tokens.forEach(token => {
      // Handle Typography tokens
      if (token.tokenType === "Typography") {
        const typographyToken = token as unknown as TypographyToken;
        const family = typographyToken.value.fontFamily.text;
        const weight = typographyToken.value.fontWeight.text.toLowerCase();
        
        if (!fontFamilyMap.has(family)) {
          fontFamilyMap.set(family, new Set());
        }
        fontFamilyMap.get(family)?.add(weight);
      }
      
      // Handle FontFamily tokens
      if (token.tokenType === "FontFamily") {
        const fontFamilyToken = token as unknown as FontFamilyToken;
        const family = fontFamilyToken.value.text;
        
        if (!fontFamilyMap.has(family)) {
          fontFamilyMap.set(family, new Set(['400'])); // Add default weight 400
        }
      }
    });
  
    // Convert Map to array of objects and ensure each family has at least weight 400
    return Array.from(fontFamilyMap.entries()).map(([family, variants]) => {
      // If no variants are present, add 400 as default
      if (variants.size === 0) {
        variants.add('400');
      }
      return {
        family,
        variants: Array.from(variants)
      };
    });
  }
  
  /** @internal Get Google Fonts data from local webfonts */
  function fetchGoogleFonts(): GoogleFontsResponse['items'] {
    try {
      // Import webfonts data from local storage
      const webfonts = require('../data/webfonts.json') as GoogleFontsResponse;
      return webfonts.items;
    } catch (error) {
      console.error('Error loading local webfonts:', error);
      return [];
    }
  }
  
  /** Process and combine fonts from all sources */
  export function processFontsForLoading(
    designSystemFonts: FontResource[], 
    extractedFonts: { family: string; variants: string[] }[]
  ): FontLoadingDefinition[] {
    const fontDefinitions: FontLoadingDefinition[] = [];
  
    // Process design system fonts
    designSystemFonts.forEach(fontResource => {
      if (fontResource.fontProperties.family) {
        fontDefinitions.push({
          family: fontResource.fontProperties.family,
          sources: [{
            url: fontResource.url,
            weight: fontResource.fontProperties.weight,
            style: fontResource.fontProperties.isItalic ? "italic" : "normal",
            format: getFontFormat(fontResource.url),
            source: "designSystem"
          }]
        });
      }
    });
  
    // Process Google Fonts from local webfonts
    try {
      const googleFonts = fetchGoogleFonts();
      
      extractedFonts.forEach(({ family, variants }) => {
        // Use case-insensitive comparison for lookup only
        const googleFont = googleFonts.find(font => 
          font.family.toLowerCase() === family.toLowerCase()
        );
        
        if (googleFont) {
          const sources = variants.map(variant => {
            const variantLower = variant.toLowerCase();
            const weight = generateFontWeight(variant).toString();
            
            // Try both the original variant and weight-based version
            let fileUrl = googleFont.files[variantLower];
            if (!fileUrl && variantLower === 'regular') {
              fileUrl = googleFont.files['400'];
            } else if (!fileUrl && weight === '400') {
              fileUrl = googleFont.files['regular'];
            }
            
            if (fileUrl) {
              return {
                url: fileUrl,
                weight: generateFontWeight(variant),
                style: variant.includes('italic') ? 'italic' as const : 'normal' as const,
                format: getFontFormat(fileUrl),
                source: "google" as const
              };
            }
            return null;
          }).filter((source): source is NonNullable<typeof source> => source !== null);
          
          if (sources.length > 0) {
            fontDefinitions.push({
              family: googleFont.family,
              sources
            });
          }
        }
      });
    } catch (error) {
      console.error('Failed to process Google Fonts:', error);
    }
  
    return fontDefinitions;
  }
  
  // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // MARK: - Helper Functions
  
  /** Helper function to generate font weight from variant */
  export function generateFontWeight(variant: string): number {
    const numericWeight = parseInt(variant);
    if (!isNaN(numericWeight)) {
      return numericWeight;
    }
    
    const weightMap: Record<string, number> = {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    };
  
    const normalizedVariant = variant.toLowerCase().replace(/[^a-z]/g, '');
    return weightMap[normalizedVariant] || 400;
  }
  
  /** Helper function to determine font format from URL */
  export function getFontFormat(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'woff2':
        return 'woff2';
      case 'woff':
        return 'woff';
      case 'ttf':
        return 'truetype';
      case 'otf':
        return 'opentype';
      case 'eot':
        return 'embedded-opentype';
      default:
        return 'truetype';
    }
  }  
