import { resolveVars } from './css.ts';

export type Mode = 'light' | 'dark';
export type ColorState = 'base' | 'hover' | 'active';

/** Couleur primitive DSFR, avec sa valeur en mode clair et en mode sombre. */
export interface ColorVariable {
  /** Nom complet de la variable, sans `--` (ex. `blue-france-sun-113-625`). */
  name: string;
  /** Famille (ex. `blue-france`). */
  family: string;
  /** Nom sans la famille (ex. `sun-113-625-hover`). */
  key: string;
  light: string;
  dark: string;
}

/** Lecture d'un nom de couleur primitive DSFR. */
export interface ColorKey {
  /** Paire de niveaux sans l'état (ex. `sun-113-625`). */
  pair: string;
  state: ColorState;
  /** Niveau de luminosité utilisé en mode clair (0 = noir, 1000 = blanc). */
  lightLevel: number;
  /** Niveau de luminosité utilisé en mode sombre. */
  darkLevel: number;
  /** Couleur « main » : identique dans les deux modes. */
  main: boolean;
}

const HEX = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
const COLOR_NAME = /^([a-z]+(?:-[a-z]+)*?)-((?:sun|moon|main|\d)[a-z0-9-]*)$/;
const DECISION_NAME = /^(?:background|text|border|artwork)-/;

/** Normalise une couleur hexadécimale en minuscules sur 6 chiffres. */
export function normalizeHex(hex: string): string {
  const h = hex.toLowerCase();
  return h.length === 4 ? `#${[...h.slice(1)].map((c) => c + c).join('')}` : h;
}

/**
 * Décode le nom d'une couleur primitive DSFR. Le nom encode le niveau de
 * luminosité clair puis sombre : `sun-113-625` vaut le niveau 113 en clair et
 * 625 en sombre ; `975-75-hover` est l'état survolé du couple 975 / 75 ;
 * `main-525` est identique dans les deux modes.
 */
export function parseColorKey(key: string): ColorKey {
  const stateMatch = key.match(/-(hover|active)$/);
  const state = (stateMatch?.[1] ?? 'base') as ColorState;
  const pair = stateMatch ? key.slice(0, -stateMatch[0].length) : key;
  const levels = pair
    .split('-')
    .filter((part) => /^\d+$/.test(part))
    .map(Number);
  const main = pair.startsWith('main-');
  if (main && levels.length === 1) {
    return { pair, state, lightLevel: levels[0], darkLevel: levels[0], main };
  }
  if (levels.length !== 2) {
    throw new Error(`Nom de couleur DSFR inattendu : « ${key} »`);
  }
  return { pair, state, lightLevel: levels[0], darkLevel: levels[1], main };
}

/** Convertit un nom de famille DSFR en identifiant camelCase. */
export function camelCase(name: string): string {
  return name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

/**
 * Couleurs primitives : variables `:root` à valeur hexadécimale, avec leur
 * valeur sombre (surcharge `:root[data-fr-theme=dark]`, sinon identique).
 */
export function collectColors(
  lightVars: Map<string, string>,
  darkVars: Map<string, string>,
): ColorVariable[] {
  const colors: ColorVariable[] = [];
  for (const [name, value] of lightVars) {
    if (!HEX.test(value) || DECISION_NAME.test(name)) continue;
    const match = name.match(COLOR_NAME);
    if (!match) continue;
    const dark = darkVars.get(name) ?? value;
    if (!HEX.test(dark)) {
      throw new Error(
        `Valeur sombre non hexadécimale pour --${name} : ${dark}`,
      );
    }
    colors.push({
      name,
      family: match[1],
      key: match[2],
      light: normalizeHex(value),
      dark: normalizeHex(dark),
    });
  }
  return colors;
}

/** Regroupe les couleurs par famille, dans l'ordre d'apparition. */
export function groupByFamily(
  colors: ColorVariable[],
): Map<string, ColorVariable[]> {
  const families = new Map<string, ColorVariable[]>();
  for (const color of colors) {
    const list = families.get(color.family) ?? [];
    list.push(color);
    families.set(color.family, list);
  }
  return families;
}

/** Token décisionnel résolu en clair et en sombre. */
export interface DecisionToken {
  name: string;
  light: string;
  dark: string;
}

/**
 * Tokens décisionnels (`--background-*`, `--text-*`, `--border-*`,
 * `--artwork-*`) résolus jusqu'aux couleurs primitives dans chaque mode.
 */
export function collectDecisions(
  lightVars: Map<string, string>,
  darkVars: Map<string, string>,
): DecisionToken[] {
  const darkScope = new Map([...lightVars, ...darkVars]);
  const decisions: DecisionToken[] = [];
  for (const [name, value] of lightVars) {
    if (!DECISION_NAME.test(name) || !value.startsWith('var(')) continue;
    const light = resolveVars(value, lightVars);
    const dark = resolveVars(value, darkScope);
    for (const resolved of [light, dark]) {
      if (!HEX.test(resolved)) {
        throw new Error(
          `Token décisionnel non résolu : --${name} → ${resolved}`,
        );
      }
    }
    decisions.push({
      name,
      light: normalizeHex(light),
      dark: normalizeHex(dark),
    });
  }
  return decisions;
}
