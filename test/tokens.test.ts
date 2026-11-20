import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import {
  getFormattedColor,
  referenceBadgeTooltip,
} from '../typescript/src/doc_functionality/tokens';
import { fastRenderTokenStackToHtml } from '../typescript/src/doc_functionality/renderers';

// The stack fast path reads `Pulsar.exportConfiguration.useFastRenderersTokens` at runtime.
beforeAll(() => {
  (globalThis as any).Pulsar = {
    exportConfiguration: { useFastRenderersTokens: true },
  };
});

afterAll(() => {
  delete (globalThis as any).Pulsar;
});

// ----- builders mirroring the SDK 2.6 color value shapes ---------------------

const blueGroup = { name: 'blue' };
const blue500 = { id: 'blue-500', name: '500', parent: blueGroup };
const accent = { id: 'accent', name: 'accent', parent: null };

const rgb = { r: 51, g: 102, b: 255 };
const opacity = (measure: number) => ({ measure, unit: 'Raw' });

const colorToken = (name: string, value: any) => ({
  id: name,
  name,
  tokenType: 'Color',
  value,
});

const plainColor = (measure = 1) => ({
  color: { ...rgb },
  opacity: opacity(measure),
});

// A color that references another color for its color part, with its own opacity
const ownOpacity = (measure: number, source: any = blue500) => ({
  color: { ...rgb, referencedTokenId: source.id, referencedToken: source },
  opacity: opacity(measure),
  referencedTokenId: null,
});

// A plain reference: the target's value, with the target's color reference copied over
const plainReferenceTo = (target: any, targetValue: any) => ({
  ...targetValue,
  referencedTokenId: target.id,
  referencedToken: target,
});

const faded = { id: 'accent-faded', name: 'accent-faded', parent: null };
const opacityDisabled = {
  id: 'opacity-disabled',
  name: 'opacity-disabled',
  parent: null,
};
const opacity50 = { id: 'opacity-50', name: '50', parent: { name: 'opacity' } };

// An opacity part that references an Opacity (or Dimension) token
const referencedOpacity = (source: any, measure = 0.4) => ({
  ...opacity(measure),
  referencedTokenId: source.id,
  referencedToken: source,
});

// A color that references a color for its color part and a token for its opacity
const bothParts = (
  colorSource: any = blue500,
  opacitySource: any = opacityDisabled,
) => ({
  color: {
    ...rgb,
    referencedTokenId: colorSource.id,
    referencedToken: colorSource,
  },
  opacity: referencedOpacity(opacitySource),
  referencedTokenId: null,
});

describe('getFormattedColor', () => {
  test('own opacity shows a one-decimal percent', () => {
    expect(getFormattedColor(ownOpacity(0.256) as any)).toBe(
      'rgba(51,102,255,25.6%)',
    );
    expect(getFormattedColor(ownOpacity(0.3333) as any)).toBe(
      'rgba(51,102,255,33.3%)',
    );
    expect(getFormattedColor(ownOpacity(0.0005) as any)).toBe(
      'rgba(51,102,255,0.1%)',
    );
    expect(getFormattedColor(ownOpacity(0.9995) as any)).toBe(
      'rgba(51,102,255,100%)',
    );
    expect(getFormattedColor(ownOpacity(0) as any)).toBe('rgba(51,102,255,0%)');
  });

  test('own opacity of 1 stays hex', () => {
    expect(getFormattedColor(ownOpacity(1) as any)).toBe('#3366ff');
  });

  test('plain reference to a color with its own opacity shows the percent', () => {
    expect(
      getFormattedColor(plainReferenceTo(faded, ownOpacity(0.256)) as any),
    ).toBe('rgba(51,102,255,25.6%)');
  });

  test('see-through colors with no own opacity or Opacity token show the percent, opaque ones stay hex', () => {
    expect(getFormattedColor(plainColor() as any)).toBe('#3366ff');
    expect(getFormattedColor(plainColor(0.256) as any)).toBe(
      'rgba(51,102,255,25.6%)',
    );
    expect(
      getFormattedColor(plainReferenceTo(accent, plainColor(0.256)) as any),
    ).toBe('rgba(51,102,255,25.6%)');
  });

  test('hex color whose opacity references an Opacity token shows the percent', () => {
    const value = {
      color: { ...rgb },
      opacity: { ...opacity(0.256), referencedTokenId: 'opacity-26' },
    };
    expect(getFormattedColor(value as any)).toBe('rgba(51,102,255,25.6%)');
  });

  test("a shadow's own opacity keeps a 0–1 alpha, not a percent", () => {
    const value = plainReferenceTo(faded, ownOpacity(0.256));
    expect(getFormattedColor(value as any, true, opacity(0.2) as any)).toBe(
      'rgba(51,102,255,0.2)',
    );
  });
});

describe('referenceBadgeTooltip', () => {
  test('color and opacity references show on separate lines', () => {
    expect(
      referenceBadgeTooltip(colorToken('accent-disabled', bothParts())),
    ).toBe('Color: blue 500\nOpacity: opacity-disabled');
  });

  test('own opacity names its source color, with the group for short names', () => {
    expect(
      referenceBadgeTooltip(colorToken('accent-faded', ownOpacity(0.256))),
    ).toBe('Color: blue 500');
    expect(
      referenceBadgeTooltip(colorToken('brand-faded', ownOpacity(0.3, accent))),
    ).toBe('Color: accent');
  });

  test('a raw color with an opacity reference names only its opacity', () => {
    const value = { color: { ...rgb }, opacity: referencedOpacity(opacity50) };
    expect(referenceBadgeTooltip(colorToken('raw', value))).toBe(
      'Opacity: opacity 50',
    );
  });

  test('plain reference names its direct target, not its copied parts', () => {
    expect(
      referenceBadgeTooltip(
        colorToken('ref', plainReferenceTo(faded, ownOpacity(0.256))),
      ),
    ).toBe('Referenced token: accent-faded');
    expect(
      referenceBadgeTooltip(
        colorToken('ref', plainReferenceTo(accent, bothParts())),
      ),
    ).toBe('Referenced token: accent');
  });

  test('a lost part target drops only its own line', () => {
    const lostColor = bothParts();
    lostColor.color.referencedToken = undefined as any;
    expect(referenceBadgeTooltip(colorToken('a', lostColor))).toBe(
      'Opacity: opacity-disabled',
    );
    const lostOpacity = bothParts();
    lostOpacity.opacity.referencedToken = undefined as any;
    expect(referenceBadgeTooltip(colorToken('b', lostOpacity))).toBe(
      'Color: blue 500',
    );
  });

  test('names are HTML-escaped for the title attribute', () => {
    const odd = { id: 'odd', name: 'a<b & "c"', parent: null };
    expect(
      referenceBadgeTooltip(
        colorToken('ref', plainReferenceTo(odd, plainColor())),
      ),
    ).toBe('Referenced token: a&lt;b &amp; &quot;c&quot;');
  });

  test('no badge without a resolved source', () => {
    expect(
      referenceBadgeTooltip(colorToken('plain', plainColor(0.256))),
    ).toBeNull();
    const lostTarget = {
      ...plainReferenceTo(faded, bothParts()),
      referencedToken: null,
    };
    expect(referenceBadgeTooltip(colorToken('ref', lostTarget))).toBeNull();
    const lostSource = ownOpacity(0.256);
    lostSource.color.referencedToken = undefined as any;
    expect(referenceBadgeTooltip(colorToken('faded', lostSource))).toBeNull();
  });

  test('only Color tokens get part lines', () => {
    expect(
      referenceBadgeTooltip({
        name: 'border',
        tokenType: 'Border',
        value: bothParts(),
      }),
    ).toBeNull();
  });
});

describe('fastRenderTokenStackToHtml', () => {
  test('own opacity renders the badge and the percent', () => {
    const html = fastRenderTokenStackToHtml({ variantKey: 'stack' }, [
      {
        themedTokens: [colorToken('accent-faded', ownOpacity(0.256))],
        themes: [],
      },
    ]);
    expect(html).toContain(
      'data-bs-custom-class="tooltip-multiline" title="Color: blue 500"',
    );
    expect(html).toContain('rgba(51,102,255,25.6%)');
  });

  test('color and opacity references render on two lines', () => {
    const html = fastRenderTokenStackToHtml({ variantKey: 'stack' }, [
      {
        themedTokens: [colorToken('accent-disabled', bothParts())],
        themes: [],
      },
    ]);
    expect(html).toContain(
      'title="Color: blue 500\nOpacity: opacity-disabled"',
    );
  });

  test('plain color renders no badge', () => {
    const html = fastRenderTokenStackToHtml({ variantKey: 'stack' }, [
      { themedTokens: [colorToken('plain', plainColor(0.256))], themes: [] },
    ]);
    expect(html).not.toContain('reference-badge');
    expect(html).toContain('rgba(51,102,255,25.6%)');
  });
});
