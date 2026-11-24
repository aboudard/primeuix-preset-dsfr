/**
 * Fichier généré par `nx run extract-dsfr-tokens:extract` : ne pas éditer à la main.
 * Source : @gouvfr/dsfr 1.15.4 (dist/core/core.css, dist/scheme/scheme.css).
 */

/** Anneau de focus et ombres DSFR. */
export const dsfrEffects = {
  focusRing: {
    width: '2px',
    style: 'solid',
    color: '#0a76f6',
    offset: '2px',
  },
  shadow: {
    raised: {
      light: '0 1px 3px rgba(0, 0, 18, 0.16)',
      dark: '0 1px 3px rgba(0, 0, 18, 0.32)',
    },
    overlap: {
      light: '0 2px 6px rgba(0, 0, 18, 0.16)',
      dark: '0 2px 6px rgba(0, 0, 18, 0.32)',
    },
    lifted: {
      light: '0 3px 9px rgba(0, 0, 18, 0.16)',
      dark: '0 3px 9px rgba(0, 0, 18, 0.32)',
    },
  },
} as const;
