import {
  type ColorState,
  type ColorVariable,
  type Mode,
  parseColorKey,
} from './colors.ts';

/** Couleur disponible à un niveau de luminosité donné. */
interface LevelColor {
  value: string;
  /** Variable DSFR d'origine et mode dans lequel elle prend cette valeur. */
  source: string;
}

type Levels = Map<number, Partial<Record<ColorState, LevelColor>>>;

/**
 * Spécification d'un pas de l'échelle Prime :
 * - un niveau DSFR (`975`, `850`…) ;
 * - ou un rôle relatif au couple « sun » de la famille (couleur d'action :
 *   `sun-113-625`, `425-625`, `sun-418-moon-817`…).
 */
export type StepSpec =
  | number
  | 'sun'
  | 'sunHover'
  | 'sunActive'
  | 'moon'
  | 'main';

export type ScaleMapping = Record<string, StepSpec>;

/**
 * Correspondance des familles colorées vers l'échelle Prime 50 → 950.
 * 400 et 500 sont la couleur d'action sombre (`moon`) et la couleur `main` ;
 * 600 / 700 / 800 sont la couleur d'action claire (`sun`) active / survolée /
 * au repos, ce qui fait de `800` la couleur primaire DSFR (`#000091`).
 */
export const COLOR_SCALE: ScaleMapping = {
  50: 975,
  100: 950,
  200: 925,
  300: 850,
  400: 'moon',
  500: 'main',
  600: 'sunActive',
  700: 'sunHover',
  800: 'sun',
  900: 125,
  950: 75,
};

/** Correspondance des gris DSFR vers l'échelle Prime 0 → 950 (surfaces). */
export const GREY_SCALE: ScaleMapping = {
  0: 1000,
  50: 975,
  100: 950,
  200: 925,
  300: 900,
  400: 850,
  500: 625,
  600: 425,
  700: 200,
  800: 125,
  900: 75,
  950: 50,
};

export interface ScaleEntry {
  step: string;
  value: string;
  source: string;
}

/** Index des couleurs d'une famille par niveau de luminosité et par état. */
export function indexLevels(colors: ColorVariable[]): Levels {
  const levels: Levels = new Map();
  const add = (
    level: number,
    state: ColorState,
    value: string,
    color: ColorVariable,
    mode: Mode,
  ) => {
    const entry = levels.get(level) ?? {};
    levels.set(level, entry);
    // Le premier nom rencontré fait foi (plusieurs couples partagent souvent
    // un même niveau, avec la même valeur).
    entry[state] ??= {
      value,
      source: `${color.name} (${mode === 'light' ? 'clair' : 'sombre'})`,
    };
  };
  for (const color of colors) {
    const key = parseColorKey(color.key);
    add(key.lightLevel, key.state, color.light, color, 'light');
    add(key.darkLevel, key.state, color.dark, color, 'dark');
  }
  return levels;
}

/** Couple « sun » : couleur d'action, sombre en clair et claire en sombre. */
function findSunPair(colors: ColorVariable[]) {
  const candidates = colors
    .map((color) => parseColorKey(color.key))
    .filter(
      (key) =>
        key.state === 'base' &&
        !key.main &&
        key.lightLevel < 500 &&
        key.darkLevel > 500,
    );
  if (candidates.length !== 1) {
    throw new Error(
      `Couple « sun » introuvable ou ambigu : ${candidates.map((c) => c.pair).join(', ')}`,
    );
  }
  return candidates[0];
}

function mixHex(from: string, to: string, ratio: number): string {
  const channels = (hex: string) =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const a = channels(from);
  const b = channels(to);
  return `#${a
    .map((c, i) =>
      Math.round(c + (b[i] - c) * ratio)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

/**
 * Couleur d'un niveau ; si le DSFR ne le définit pas, interpolation linéaire
 * (sRGB) entre les niveaux définis les plus proches.
 */
function colorAt(levels: Levels, level: number, state: ColorState): LevelColor {
  const exact = levels.get(level)?.[state];
  if (exact) return exact;
  if (state !== 'base') {
    throw new Error(`État ${state} absent au niveau ${level}`);
  }
  const defined = [...levels.entries()]
    .filter(([, entry]) => entry.base)
    .map(([l]) => l)
    .sort((a, b) => a - b);
  const below = defined.filter((l) => l < level).at(-1);
  const above = defined.find((l) => l > level);
  if (below === undefined || above === undefined) {
    throw new Error(`Niveau ${level} hors de la plage définie`);
  }
  const low = levels.get(below)?.base as LevelColor;
  const high = levels.get(above)?.base as LevelColor;
  return {
    value: mixHex(low.value, high.value, (level - below) / (above - below)),
    source: `interpolé (niveau ${level}) entre ${low.source} et ${high.source}`,
  };
}

/** Construit l'échelle Prime d'une famille selon une correspondance. */
export function buildScale(
  colors: ColorVariable[],
  mapping: ScaleMapping,
): ScaleEntry[] {
  const levels = indexLevels(colors);
  const usesRoles = Object.values(mapping).some((s) => typeof s === 'string');
  const sun = usesRoles ? findSunPair(colors) : undefined;
  const main = colors
    .map((color) => parseColorKey(color.key))
    .find((key) => key.main && key.state === 'base');

  return Object.entries(mapping).map(([step, spec]) => {
    let color: LevelColor;
    if (typeof spec === 'number') {
      color = colorAt(levels, spec, 'base');
    } else if (!sun) {
      throw new Error('Rôle sans couple « sun »');
    } else if (spec === 'main') {
      color = colorAt(
        levels,
        main?.lightLevel ?? Math.round((sun.lightLevel + sun.darkLevel) / 2),
        'base',
      );
    } else if (spec === 'moon') {
      color = colorAt(levels, sun.darkLevel, 'base');
    } else {
      const state: ColorState =
        spec === 'sunHover'
          ? 'hover'
          : spec === 'sunActive'
            ? 'active'
            : 'base';
      color = colorAt(levels, sun.lightLevel, state);
    }
    return { step, value: color.value, source: color.source };
  });
}
