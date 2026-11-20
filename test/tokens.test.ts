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
const referencedOpacity = (source: any) => ({
  ...opacity(0.4),
  referencedTokenId: source.id,
  referencedToken: source,
});

// A color that references a color for its color part and a token for its opacity
const bothParts = () => ({
  ...ownOpacity(0.4),
  opacity: referencedOpacity(opacityDisabled),
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

  test('plain reference names its direct target, not the parts copied from that target', () => {
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

  test('a part whose referenced token no longer exists drops only its own line', () => {
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

describe('referenceBadgeTooltip for a library that was not imported', () => {
  // A token whose value is plain because its reference points to a Figma library that was not imported
  const remoteOrigin = (referenceOriginName?: string) => ({
    referenceOriginId: 'VariableID:54f5d5/2035:3',
    referenceOriginRemote: true,
    referenceOriginName,
  });
  const duration = (origin: any) => ({
    id: 'fast-remote-ref',
    name: 'Fast remote ref',
    tokenType: 'Duration',
    value: { unit: 'Ms', measure: 101, referencedTokenId: null },
    origin,
  });
  const remotePart = (referenceOriginName?: string) => ({
    referenceOriginId: 'VariableID:7bb08c/5911:26',
    referenceOriginRemote: true,
    referenceResolutionFailed: true,
    referenceOriginName,
  });
  const themeOverriding = (token: any, origin: any) => ({
    overriddenTokens: [{ id: token.id, origin }],
  });

  test("a reference to a library that was not imported shows Cloud's two lines", () => {
    expect(referenceBadgeTooltip(duration(remoteOrigin('Remote fast')))).toBe(
      'Referenced token was not imported\nReference: Remote fast',
    );
  });

  test('without a name only the first line shows, and names are escaped', () => {
    expect(referenceBadgeTooltip(duration(remoteOrigin()))).toBe(
      'Referenced token was not imported',
    );
    expect(referenceBadgeTooltip(colorToken('c', plainColor()))).toBeNull();
    const color = {
      ...colorToken('c', plainColor()),
      origin: remoteOrigin('A & B'),
    };
    expect(referenceBadgeTooltip(color)).toBe(
      'Referenced token was not imported\nReference: A &amp; B',
    );
  });

  test('a library imported later names the referenced token', () => {
    const imported = {
      ...colorToken('ref', plainReferenceTo(accent, plainColor())),
      origin: {
        referenceOriginRemote: true,
        referenceOriginName: 'Remote accent',
      },
    };
    expect(referenceBadgeTooltip(imported)).toBe('Referenced token: accent');
  });

  test('a failed reference that is not remote shows no badge', () => {
    expect(
      referenceBadgeTooltip(duration({ referenceOriginId: 'VariableID:1:2' })),
    ).toBeNull();
  });

  test("a themed swatch takes the origin from the selected theme's override", () => {
    const remote = duration(remoteOrigin('Remote fast'));
    // Mode 2 overrides the remote reference with a plain 0ms
    const mode2 = themeOverriding(remote, { name: 'Fast-mode1-remote-ref' });
    expect(referenceBadgeTooltip(remote, [mode2])).toBeNull();
    // A plain token whose Mode 1 override is the remote reference
    const plain = duration(null);
    const mode1 = themeOverriding(plain, remoteOrigin('Remote fast'));
    expect(referenceBadgeTooltip(plain, [mode1])).toBe(
      'Referenced token was not imported\nReference: Remote fast',
    );
    // The last selected theme that overrides the token wins, and a theme without an override is skipped
    expect(referenceBadgeTooltip(plain, [mode1, mode2])).toBeNull();
    expect(
      referenceBadgeTooltip(remote, [mode2, { overriddenTokens: [] }]),
    ).toBeNull();
  });

  test('a color part from a library that was not imported gets its own line', () => {
    const localColorRemoteOpacity = {
      ...colorToken('28', ownOpacity(0.5, accent)),
      origin: { nestedReferences: { opacity: remotePart('Opacity/Disabled') } },
    };
    expect(referenceBadgeTooltip(localColorRemoteOpacity)).toBe(
      'Color: accent\nOpacity: Opacity/Disabled (not imported)',
    );
    const bothRemote = {
      ...colorToken('29', plainColor(0.5)),
      origin: {
        nestedReferences: {
          color: remotePart('Persistent/Black'),
          opacity: remotePart(),
        },
      },
    };
    expect(referenceBadgeTooltip(bothRemote)).toBe(
      'Color: Persistent/Black (not imported)\nOpacity: not imported',
    );
  });

  test('a failed color part that is not remote gets no line', () => {
    const deleted = {
      ...colorToken('27', plainColor(0.4)),
      origin: {
        nestedReferences: {
          color: {
            referenceOriginId: 'VariableID:1:2',
            referenceResolutionFailed: true,
          },
        },
      },
    };
    expect(referenceBadgeTooltip(deleted)).toBeNull();
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

  test('a color from a library that was not imported renders the two-line badge', () => {
    const remote = {
      ...colorToken('26', plainColor()),
      origin: {
        referenceOriginId: 'VariableID:7bb08c/5911:26',
        referenceOriginRemote: true,
        referenceOriginName: 'Persistent/Black',
      },
    };
    const html = fastRenderTokenStackToHtml({ variantKey: 'stack' }, [
      { themedTokens: [remote], themes: [] },
    ]);
    expect(html).toContain(
      'data-bs-custom-class="tooltip-multiline" title="Referenced token was not imported\nReference: Persistent/Black"',
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
