import { dsfrEffects, dsfrScales } from './tokens/generated/index.js';

/**
 * Tokens sémantiques du preset. Les variations clair / sombre passent par
 * `light-dark()`, comme dans Nora (Prime pose `color-scheme: dark` sous le
 * `darkModeSelector`).
 */
export function createSemantic() {
  return {
    primary: {
      ...Object.fromEntries(
        Object.keys(dsfrScales.blueFrance).map((k) => [k, `{blueFrance.${k}}`]),
      ),
      color: 'light-dark({blueFrance.800}, {blueFrance.400})',
      contrastColor: 'light-dark(#ffffff, {blueFrance.800})',
      hoverColor: 'light-dark({blueFrance.700}, {blueFrance.300})',
      activeColor: 'light-dark({blueFrance.600}, {blueFrance.200})',
    },
    focusRing: {
      width: dsfrEffects.focusRing.width,
      style: dsfrEffects.focusRing.style,
      color: dsfrEffects.focusRing.color,
      offset: dsfrEffects.focusRing.offset,
      shadow: 'none',
    },
  };
}
