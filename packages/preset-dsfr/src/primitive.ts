import {
  dsfrRadius,
  dsfrScales,
  dsfrScaleVars,
  type DsfrScaleFamily,
} from './tokens/generated/index.js';

export interface PrimitiveOptions {
  /** Voir {@link PresetDsfrOptions.bridge}. */
  bridge?: boolean;
}

/** Correspondance d'un pas vers les variables DSFR clair / sombre. */
export interface ScaleVar {
  readonly light: string | null;
  readonly dark: string | null;
}

/**
 * Valeur « pont » d'une couleur : renvoie vers la variable CSS DSFR qui vaut
 * exactement `hex` dans chaque thème, avec `hex` en repli si `dsfr.css` n'est
 * pas chargé.
 *
 * Les variables primitives DSFR changent de valeur avec le thème
 * (`--blue-france-sun-113-625` : `#000091` en clair, `#8585f6` en sombre) ;
 * on choisit donc une variable par thème et on les combine avec `light-dark()`,
 * qui suit le `color-scheme` posé par Prime sur le sélecteur sombre.
 */
export function bridgeColor(hex: string, vars: ScaleVar): string {
  const light = vars.light ? `var(--${vars.light}, ${hex})` : hex;
  const dark = vars.dark ? `var(--${vars.dark}, ${hex})` : hex;
  return light === dark ? light : `light-dark(${light}, ${dark})`;
}

type Palettes = { [F in DsfrScaleFamily]: Record<string, string> };

/** Palettes DSFR au format Prime (`blueFrance.800`, `grey.0`…). */
export function createPalettes({ bridge = false }: PrimitiveOptions = {}) {
  const palettes = {} as Palettes;
  for (const family of Object.keys(dsfrScales) as DsfrScaleFamily[]) {
    const scale: Record<string, string> = dsfrScales[family];
    const vars: Record<string, ScaleVar> = dsfrScaleVars[family];
    palettes[family] = Object.fromEntries(
      Object.entries(scale).map(([step, hex]) => [
        step,
        bridge ? bridgeColor(hex, vars[step]) : hex,
      ]),
    );
  }
  return palettes;
}

/** Tokens primitifs du preset. */
export function createPrimitive(options: PrimitiveOptions = {}) {
  return {
    ...createPalettes(options),
    // DSFR : angles droits par défaut. Les rayons propres à certains
    // composants (champs, cases à cocher, tags) sont posés au niveau
    // sémantique ou composant.
    borderRadius: {
      none: dsfrRadius.none,
      xs: dsfrRadius.none,
      sm: dsfrRadius.none,
      md: dsfrRadius.none,
      lg: dsfrRadius.none,
      xl: dsfrRadius.none,
    },
  };
}
