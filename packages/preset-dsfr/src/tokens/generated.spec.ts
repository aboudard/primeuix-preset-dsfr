import {
  dsfrColors,
  dsfrDecisions,
  dsfrEffects,
  dsfrRadius,
  dsfrScales,
  dsfrSpacing,
  dsfrTypography,
  DSFR_VERSION,
} from './generated';

describe('tokens DSFR générés', () => {
  it('indique la version source du DSFR', () => {
    expect(DSFR_VERSION).toMatch(/^1\.\d+\.\d+$/);
  });

  it('contient les couleurs primitives clé, en clair et en sombre', () => {
    expect(dsfrColors.blueFrance['sun-113-625']).toEqual({
      light: '#000091',
      dark: '#8585f6',
    });
    expect(dsfrColors.redMarianne['main-472']).toEqual({
      light: '#e1000f',
      dark: '#e1000f',
    });
    expect(dsfrColors.grey['1000-50']).toEqual({
      light: '#ffffff',
      dark: '#161616',
    });
  });

  it('couvre les couleurs système et illustratives', () => {
    for (const family of ['info', 'success', 'warning', 'error']) {
      expect(dsfrScales).toHaveProperty(family);
    }
    expect(dsfrScales).toHaveProperty('greenTilleulVerveine');
    expect(dsfrScales).toHaveProperty('purpleGlycine');
  });

  it('construit des échelles Prime complètes', () => {
    const steps = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
    ];
    for (const [family, scale] of Object.entries(dsfrScales)) {
      const expected = family === 'grey' ? ['0', ...steps] : steps;
      expect(Object.keys(scale).sort(), family).toEqual(expected.sort());
      for (const value of Object.values(scale)) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
    expect(dsfrScales.blueFrance[800]).toBe('#000091');
    expect(dsfrScales.blueFrance[700]).toBe('#1212ff');
    expect(dsfrScales.blueFrance[600]).toBe('#2323ff');
    expect(dsfrScales.redMarianne[500]).toBe('#e1000f');
  });

  it('résout les tokens décisionnels en clair et en sombre', () => {
    expect(dsfrDecisions['background-action-high-blue-france']).toEqual({
      light: '#000091',
      dark: '#8585f6',
    });
    expect(dsfrDecisions['text-default-grey']).toEqual({
      light: '#3a3a3a',
      dark: '#cecece',
    });
    expect(dsfrDecisions['border-default-grey'].light).toBe('#dddddd');
    for (const token of Object.values(dsfrDecisions)) {
      expect(token.light).toMatch(/^#[0-9a-f]{6}$/);
      expect(token.dark).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('extrait le focus, la typographie, les espacements et les rayons', () => {
    expect(dsfrEffects.focusRing).toEqual({
      width: '2px',
      style: 'solid',
      color: '#0a76f6',
      offset: '2px',
    });
    expect(dsfrTypography.fontFamily.base).toBe(
      '"Marianne", arial, sans-serif',
    );
    expect(dsfrTypography.heading.h1.desktop.fontSize).toBe('2.5rem');
    expect(dsfrSpacing['1v']).toBe('0.25rem');
    expect(dsfrSpacing['1w']).toBe('0.5rem');
    expect(dsfrRadius.field).toBe('0.25rem 0.25rem 0 0');
  });
});
