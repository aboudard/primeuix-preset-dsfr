import {
  camelCase,
  collectColors,
  collectDecisions,
  groupByFamily,
  parseColorKey,
} from './colors.ts';
import { parseCss, readCustomProperties, resolveVars } from './css.ts';
import { toLiteral } from './emit.ts';
import { extractSpacing } from './foundations.ts';
import { buildScale, COLOR_SCALE } from './scale.ts';

const LIGHT_CSS = `
:root {
  --blue-france-975-75: #f5f5fe;
  --blue-france-950-100: #ececfe;
  --blue-france-925-125: #e3e3fd;
  --blue-france-850-200: #cacafb;
  --blue-france-sun-113-625: #000091;
  --blue-france-sun-113-625-hover: #1212ff;
  --blue-france-sun-113-625-active: #2323ff;
  --blue-france-main-525: #6a6af4;
  --background-action-high-blue-france: var(--blue-france-sun-113-625);
  --text-decoration: none;
}
@media (min-width: 48em) { :root { --blue-france-975-75: #000; } }
.fr-m-1w { margin: 0.5rem !important; }
.fr-m-0-5v { margin: 0.125rem !important; }
.fr-m-1v { margin: 0.25rem !important; }
`;
const DARK_CSS = `
:root[data-fr-theme=dark] {
  --blue-france-975-75: #1b1b35;
  --blue-france-950-100: #21213f;
  --blue-france-925-125: #272747;
  --blue-france-850-200: #313178;
  --blue-france-sun-113-625: #8585f6;
  --blue-france-sun-113-625-hover: #b1b1f9;
  --blue-france-sun-113-625-active: #c6c6fb;
}
`;

const light = readCustomProperties(parseCss(LIGHT_CSS), ':root');
const dark = readCustomProperties(
  parseCss(DARK_CSS),
  ':root[data-fr-theme=dark]',
);

describe('parseColorKey', () => {
  it('lit le niveau clair puis le niveau sombre', () => {
    expect(parseColorKey('sun-113-625-hover')).toEqual({
      pair: 'sun-113-625',
      state: 'hover',
      lightLevel: 113,
      darkLevel: 625,
      main: false,
    });
    expect(parseColorKey('sun-418-moon-817')).toMatchObject({
      lightLevel: 418,
      darkLevel: 817,
    });
    expect(parseColorKey('main-525')).toMatchObject({
      lightLevel: 525,
      darkLevel: 525,
      main: true,
    });
  });

  it('rejette un nom inconnu', () => {
    expect(() => parseColorKey('foo')).toThrow();
  });
});

describe('variables CSS', () => {
  it('ignore les règles imbriquées dans @media', () => {
    expect(light.get('blue-france-975-75')).toBe('#f5f5fe');
  });

  it('résout les var() récursivement', () => {
    const vars = new Map([
      ['a', 'var(--b)'],
      ['b', 'var(--c)'],
      ['c', '#fff'],
    ]);
    expect(resolveVars('var(--a)', vars)).toBe('#fff');
  });
});

describe('couleurs', () => {
  const colors = collectColors(light, dark);

  it('associe valeurs claire et sombre', () => {
    expect(colors.find((c) => c.key === 'sun-113-625')).toMatchObject({
      family: 'blue-france',
      light: '#000091',
      dark: '#8585f6',
    });
    expect(colors.find((c) => c.key === 'main-525')?.dark).toBe('#6a6af4');
  });

  it('résout les tokens décisionnels dans les deux modes', () => {
    expect(collectDecisions(light, dark)).toEqual([
      {
        name: 'background-action-high-blue-france',
        light: '#000091',
        dark: '#8585f6',
      },
    ]);
  });

  it('construit une échelle Prime', () => {
    const family = groupByFamily(colors).get('blue-france') ?? [];
    const scale = Object.fromEntries(
      buildScale(family, COLOR_SCALE).map((e) => [e.step, e.value]),
    );
    expect(scale).toEqual({
      50: '#f5f5fe',
      100: '#ececfe',
      200: '#e3e3fd',
      300: '#cacafb',
      400: '#8585f6',
      500: '#6a6af4',
      600: '#2323ff',
      700: '#1212ff',
      800: '#000091',
      900: '#272747',
      950: '#1b1b35',
    });
  });

  it('enregistre la variable exacte de chaque thème pour chaque pas', () => {
    const family = groupByFamily(colors).get('blue-france') ?? [];
    const vars = Object.fromEntries(
      buildScale(family, COLOR_SCALE).map((e) => [e.step, e.vars]),
    );
    expect(vars['800']).toEqual({ light: 'blue-france-sun-113-625' });
    expect(vars['400']).toEqual({ dark: 'blue-france-sun-113-625' });
    expect(vars['500']).toEqual({
      light: 'blue-france-main-525',
      dark: 'blue-france-main-525',
    });
    expect(vars['950']).toEqual({ dark: 'blue-france-975-75' });
  });

  it('interpole un niveau absent', () => {
    const family = groupByFamily(colors).get('blue-france') ?? [];
    const withoutMain = family.filter((c) => c.key !== 'main-525');
    const [main] = buildScale(withoutMain, { 500: 'main' });
    expect(main.source).toMatch(/^interpolé \(niveau 369\)/);
  });
});

describe('fondamentaux', () => {
  it('trie les espacements', () => {
    expect(extractSpacing(parseCss(LIGHT_CSS))).toEqual({
      '0-5v': '0.125rem',
      '1v': '0.25rem',
      '1w': '0.5rem',
    });
  });
});

describe('émission', () => {
  it('produit un littéral TypeScript commenté', () => {
    expect(camelCase('green-tilleul-verveine')).toBe('greenTilleulVerveine');
    expect(
      toLiteral({ a: { 50: '#fff', 'x-y': 1 } }, new Map([['a.50', 'note']])),
    ).toBe('{\n  a: {\n    50: \'#fff\', // note\n    "x-y": 1,\n  },\n}');
  });
});
