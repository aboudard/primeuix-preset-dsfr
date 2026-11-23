/**
 * Fichier généré par `nx run extract-dsfr-tokens:extract` : ne pas éditer à la main.
 * Source : @gouvfr/dsfr 1.15.4 (dist/core/core.css).
 */

/** Typographie DSFR : familles, graisses, titres et textes (mobile / à partir de 48em). */
export const dsfrTypography = {
  fontFamily: {
    base: '"Marianne", arial, sans-serif',
    alt: '"Spectral", georgia, serif',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    bold: 700,
    heavy: 900,
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  heading: {
    h1: {
      mobile: {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
      desktop: {
        fontSize: '2.5rem',
        lineHeight: '3rem',
      },
    },
    h2: {
      mobile: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
      },
      desktop: {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
    },
    h3: {
      mobile: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
      },
      desktop: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
      },
    },
    h4: {
      mobile: {
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
      },
      desktop: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
      },
    },
    h5: {
      mobile: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
      },
      desktop: {
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
      },
    },
    h6: {
      mobile: {
        fontSize: '1.125rem',
        lineHeight: '1.5rem',
      },
      desktop: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
      },
    },
  },
  display: {
    xs: {
      mobile: {
        fontSize: '2.5rem',
        lineHeight: '3rem',
      },
      desktop: {
        fontSize: '3rem',
        lineHeight: '3.5rem',
      },
    },
    sm: {
      mobile: {
        fontSize: '3rem',
        lineHeight: '3.5rem',
      },
      desktop: {
        fontSize: '3.5rem',
        lineHeight: '4rem',
      },
    },
    md: {
      mobile: {
        fontSize: '3.5rem',
        lineHeight: '4rem',
      },
      desktop: {
        fontSize: '4rem',
        lineHeight: '4.5rem',
      },
    },
    lg: {
      mobile: {
        fontSize: '4rem',
        lineHeight: '4.5rem',
      },
      desktop: {
        fontSize: '4.5rem',
        lineHeight: '5rem',
      },
    },
    xl: {
      mobile: {
        fontSize: '4.5rem',
        lineHeight: '5rem',
      },
      desktop: {
        fontSize: '5rem',
        lineHeight: '5.5rem',
      },
    },
  },
  text: {
    xs: {
      fontSize: '0.75rem',
      lineHeight: '1.25rem',
    },
    sm: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
    },
    md: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    lg: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
    xl: {
      fontSize: '1.25rem',
      lineHeight: '2rem',
    },
    lead: {
      fontSize: '1.25rem',
      lineHeight: '2rem',
    },
  },
} as const;
