import { definePreset, type Preset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';
import { createComponents } from './components/index.js';
import { css } from './css/index.js';
import { createPrimitive } from './primitive.js';
import { createSemantic } from './semantic.js';

export interface PresetDsfrOptions {
  /**
   * Mode « pont » : les palettes renvoient vers les variables CSS du DSFR
   * (`var(--blue-france-sun-113-625, #000091)`), avec la valeur extraite en
   * repli. À activer quand l'application charge déjà `dsfr.css` : le preset
   * suit alors les couleurs effectivement servies (version, surcharges).
   * Par défaut `false` : valeurs hexadécimales autonomes.
   */
  bridge?: boolean;
}

/** Crée le preset primeuix DSFR. */
export function createPresetDsfr(options: PresetDsfrOptions = {}): Preset {
  // Nora est typé avec ses seules familles de primitives : on l'élargit pour
  // pouvoir déclarer les palettes DSFR (blueFrance, redMarianne…).
  return definePreset(Nora as Preset, {
    primitive: createPrimitive(options),
    semantic: createSemantic(options),
    components: createComponents(options),
    ...(css ? { css } : {}),
  });
}

/** Preset DSFR par défaut (valeurs autonomes, sans pont). */
export const PresetDsfr = createPresetDsfr();
