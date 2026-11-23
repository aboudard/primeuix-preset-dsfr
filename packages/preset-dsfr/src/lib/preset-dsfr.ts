import { definePreset, type Preset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';
import { dsfrEffects, dsfrScales } from '../tokens/generated';

/** Palette « bleu France » (DSFR), générée depuis @gouvfr/dsfr. */
export const blueFrance = dsfrScales.blueFrance;

// Nora est typé avec ses seules familles de primitives : on l'élargit pour
// pouvoir déclarer les palettes DSFR (blueFrance, redMarianne…).
export const PresetDsfr = definePreset(Nora as Preset, {
  primitive: {
    ...dsfrScales,
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
      width: dsfrEffects.focusRing.width,
      style: dsfrEffects.focusRing.style,
      color: dsfrEffects.focusRing.color,
      offset: dsfrEffects.focusRing.offset,
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
          contrastColor: '{blueFrance.800}',
          hoverColor: '{blueFrance.300}',
          activeColor: '{blueFrance.200}',
        },
      },
    },
  },
});
