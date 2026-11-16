import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import {
  getFormattedColor,
  referenceBadgeName,
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

  test('plain colors are unchanged', () => {
    expect(getFormattedColor(plainColor() as any)).toBe('#3366ff');
    expect(getFormattedColor(plainColor(0.256) as any)).toBe(
      'rgba(51,102,255,0.26)',
    );
    expect(
      getFormattedColor(plainReferenceTo(accent, plainColor(0.256)) as any),
    ).toBe('rgba(51,102,255,0.26)');
  });

  test('hex color whose opacity references an Opacity token keeps the decimal', () => {
    const value = {
      color: { ...rgb },
      opacity: { ...opacity(0.256), referencedTokenId: 'opacity-26' },
    };
    expect(getFormattedColor(value as any)).toBe('rgba(51,102,255,0.26)');
  });

  test("a shadow's own opacity keeps the decimal", () => {
    const value = plainReferenceTo(faded, ownOpacity(0.256));
    expect(getFormattedColor(value as any, true, opacity(0.2) as any)).toBe(
      'rgba(51,102,255,0.2)',
    );
  });
});

describe('referenceBadgeName', () => {
  test('own opacity names its source color, with the group for short names', () => {
    expect(
      referenceBadgeName(colorToken('accent-faded', ownOpacity(0.256))),
    ).toBe('blue 500');
    expect(
      referenceBadgeName(colorToken('brand-faded', ownOpacity(0.3, accent))),
    ).toBe('accent');
  });

  test('plain reference names its direct target', () => {
    expect(
      referenceBadgeName(
        colorToken('ref', plainReferenceTo(faded, ownOpacity(0.256))),
      ),
    ).toBe('accent-faded');
    expect(
      referenceBadgeName(
        colorToken('ref', plainReferenceTo(accent, plainColor())),
      ),
    ).toBe('accent');
  });

  test('no badge without a resolved source', () => {
    expect(
      referenceBadgeName(colorToken('plain', plainColor(0.256))),
    ).toBeNull();
    const lostTarget = {
      ...plainReferenceTo(faded, ownOpacity(0.256)),
      referencedToken: null,
    };
    expect(referenceBadgeName(colorToken('ref', lostTarget))).toBeNull();
    const lostSource = ownOpacity(0.256);
    lostSource.color.referencedToken = undefined as any;
    expect(referenceBadgeName(colorToken('faded', lostSource))).toBeNull();
  });

  test('only Color tokens get a color part badge', () => {
    expect(
      referenceBadgeName({
        name: 'border',
        tokenType: 'Border',
        value: ownOpacity(0.256),
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
    expect(html).toContain('title="Referenced token: blue 500"');
    expect(html).toContain('rgba(51,102,255,25.6%)');
  });

  test('plain color renders no badge', () => {
    const html = fastRenderTokenStackToHtml({ variantKey: 'stack' }, [
      { themedTokens: [colorToken('plain', plainColor(0.256))], themes: [] },
    ]);
    expect(html).not.toContain('reference-badge');
    expect(html).toContain('rgba(51,102,255,0.26)');
  });
});
