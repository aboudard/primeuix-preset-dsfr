import {
  dsfrDecisions,
  dsfrEffects,
  dsfrScales,
  type DsfrDecisionToken,
  type DsfrScaleFamily,
} from './tokens/generated/index.js';

export interface DecisionOptions {
  /** Voir {@link PresetDsfrOptions.bridge}. */
  bridge?: boolean;
}

/**
 * Familles parcourues pour retrouver un pas de palette, dans l'ordre de
 * préférence (une même valeur peut exister dans plusieurs familles).
 */
const FAMILIES: readonly DsfrScaleFamily[] = [
  'grey',
  'blueFrance',
  'info',
  'success',
  'warning',
  'error',
];

const refByHex = new Map<string, string>();
for (const family of FAMILIES) {
  for (const [step, hex] of Object.entries(dsfrScales[family])) {
    const key = hex.toLowerCase();
    if (!refByHex.has(key)) refByHex.set(key, `{${family}.${step}}`);
  }
}

/** Référence de palette (`{grey.700}`) d'une couleur, sinon la couleur brute. */
export function paletteRef(hex: string): string {
  return refByHex.get(hex.toLowerCase()) ?? hex;
}

/**
 * Valeur d'un token décisionnel DSFR pour un token sémantique Prime.
 *
 * - clair / sombre combinés en `light-dark()` ;
 * - chaque couleur renvoie vers le pas de palette correspondant quand il
 *   existe (`{grey.700}`), sinon reste hexadécimale (états hover / active du
 *   mode sombre, absents des échelles) ;
 * - en mode pont, le tout est enveloppé dans `var(--<nom>, …)` : la variable
 *   décisionnelle du DSFR bascule elle-même avec `data-fr-theme`.
 *
 * `dsfrDecision('text-default-grey')` → `light-dark({grey.700}, {grey.400})`.
 */
export function dsfrDecision(
  name: DsfrDecisionToken,
  { bridge = false }: DecisionOptions = {},
): string {
  const { light, dark } = dsfrDecisions[name];
  const l = paletteRef(light);
  const d = paletteRef(dark);
  const value = l === d ? l : `light-dark(${l}, ${d})`;
  return bridge ? `var(--${name}, ${value})` : value;
}

const COLOR = /rgba?\([^)]*\)|#[0-9a-f]{3,8}\b/i;

/**
 * Ombre DSFR (`raised`, `overlap`, `lifted`). Clair et sombre ne diffèrent que
 * par la couleur : elle passe en `light-dark()`, la géométrie est conservée.
 */
export function dsfrShadow(name: keyof typeof dsfrEffects.shadow): string {
  const { light, dark } = dsfrEffects.shadow[name];
  const lc = light.match(COLOR)?.[0];
  const dc = dark.match(COLOR)?.[0];
  if (!lc || !dc || light.replace(lc, '') !== dark.replace(dc, '')) {
    return light;
  }
  return lc === dc ? light : light.replace(lc, `light-dark(${lc}, ${dc})`);
}
