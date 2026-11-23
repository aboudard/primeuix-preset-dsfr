import { definePreset, type Preset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';

/**
 * Palette « bleu France » (DSFR).
 * Valeurs provisoires pour l'initialisation : elles seront remplacées par
 * l'extraction automatique des tokens depuis @gouvfr/dsfr (phase 1).
 */
export const blueFrance = {
  50: '#f5f5fe', // blue-france-975
  100: '#ececfe', // blue-france-950
  200: '#e3e3fd', // blue-france-925
  300: '#cacafb', // blue-france-850
  400: '#8585f6', // blue-france-625 (moon)
  500: '#6a6af4', // blue-france-main-525
  600: '#2323ff', // blue-france-sun-113 (active)
  700: '#1212ff', // blue-france-sun-113 (hover)
  800: '#000091', // blue-france-sun-113
  900: '#000074',
  950: '#00005c',
} as const;

// Nora est typé avec ses seules familles de primitives : on l'élargit pour
// pouvoir déclarer les palettes DSFR (blueFrance, redMarianne…).
export const PresetDsfr = definePreset(Nora as Preset, {
  primitive: {
    blueFrance,
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.25rem',
      md: '0.25rem',
      lg: '0.25rem',
      xl: '0.5rem',
    },
  },
  semantic: {
    primary: {
      ...Object.fromEntries(
        Object.keys(blueFrance).map((k) => [k, `{blueFrance.${k}}`]),
      ),
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '#0a76f6',
      offset: '2px',
      shadow: 'none',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blueFrance.800}',
          contrastColor: '#ffffff',
          hoverColor: '{blueFrance.700}',
          activeColor: '{blueFrance.600}',
        },
      },
      dark: {
        primary: {
          color: '{blueFrance.400}',
          contrastColor: '#000091',
          hoverColor: '{blueFrance.300}',
          activeColor: '{blueFrance.200}',
        },
      },
    },
  },
});
