import { dsfrDecision, dsfrShadow, type DecisionOptions } from './decision.js';
import {
  dsfrEffects,
  dsfrRadius,
  type DsfrDecisionToken,
  dsfrScales,
  dsfrTypography,
} from './tokens/generated/index.js';

export type SemanticOptions = DecisionOptions;

/**
 * Tokens sémantiques du preset, dérivés des tokens décisionnels DSFR
 * (`--background-*`, `--text-*`, `--border-*`) : voir la table de
 * correspondance dans `docs/TOKENS.md`. Les variations clair / sombre passent
 * par `light-dark()`, comme dans Nora (Prime pose `color-scheme: dark` sous le
 * `darkModeSelector`).
 */
export function createSemantic(options: SemanticOptions = {}) {
  const d = (name: DsfrDecisionToken) => dsfrDecision(name, options);
  const { body, text } = dsfrTypography;

  return {
    typography: {
      fontFamily: dsfrTypography.fontFamily.base,
      fontSize: body.fontSize,
      // Interlignage DSFR du corps (1.5rem pour 1rem) exprimé sans unité.
      lineHeight: '1.5',
      fontWeight: 'normal',
    },
    iconSize: '1rem',

    focusRing: {
      width: dsfrEffects.focusRing.width,
      style: dsfrEffects.focusRing.style,
      color: dsfrEffects.focusRing.color,
      offset: dsfrEffects.focusRing.offset,
      shadow: 'none',
    },

    primary: {
      ...Object.fromEntries(
        Object.keys(dsfrScales.blueFrance).map((k) => [k, `{blueFrance.${k}}`]),
      ),
      color: d('background-action-high-blue-france'),
      contrastColor: d('text-inverted-blue-france'),
      hoverColor: d('background-action-high-blue-france-hover'),
      activeColor: d('background-action-high-blue-france-active'),
    },

    // L'échelle grise DSFR va déjà du blanc (0) au quasi-noir (950) : elle sert
    // telle quelle dans les deux thèmes, comme les surfaces de Nora.
    surface: Object.fromEntries(
      Object.keys(dsfrScales.grey).map((k) => [k, `{grey.${k}}`]),
    ),

    highlight: {
      background: d('background-active-blue-france'),
      focusBackground: d('background-active-blue-france-hover'),
      color: d('text-inverted-blue-france'),
      focusColor: d('text-inverted-blue-france'),
    },

    text: {
      color: d('text-default-grey'),
      hoverColor: d('text-title-grey'),
      mutedColor: d('text-mention-grey'),
      hoverMutedColor: d('text-default-grey'),
    },

    formField: {
      fontSize: body.fontSize,
      paddingX: '1rem',
      paddingY: '0.5rem',
      sm: {
        fontSize: text.sm.fontSize,
        paddingX: '0.75rem',
        paddingY: '0.25rem',
      },
      lg: {
        fontSize: text.lg.fontSize,
        paddingX: '1.25rem',
        paddingY: '0.75rem',
      },
      borderRadius: dsfrRadius.field,
      focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: 'none',
      },
      background: d('background-contrast-grey'),
      disabledBackground: d('background-disabled-grey'),
      filledBackground: d('background-contrast-grey'),
      filledHoverBackground: d('background-contrast-grey-hover'),
      filledFocusBackground: d('background-contrast-grey'),
      // Pas de bordure DSFR : seulement le trait bas (ombre ci-dessous).
      borderColor: 'transparent',
      hoverBorderColor: 'transparent',
      focusBorderColor: 'transparent',
      invalidBorderColor: d('border-plain-error'),
      color: d('text-default-grey'),
      disabledColor: d('text-disabled-grey'),
      placeholderColor: d('text-mention-grey'),
      invalidPlaceholderColor: d('text-default-error'),
      floatLabelColor: d('text-mention-grey'),
      floatLabelFocusColor: '{primary.color}',
      floatLabelActiveColor: d('text-mention-grey'),
      iconColor: d('text-default-grey'),
      // Trait bas des champs DSFR (`.fr-input`).
      shadow: `inset 0 -2px 0 0 ${d('border-plain-grey')}`,
    },

    list: {
      option: {
        focusBackground: d('background-overlap-grey-hover'),
      },
    },

    content: {
      borderRadius: '{border.radius.none}',
      background: d('background-default-grey'),
      hoverBackground: d('background-default-grey-hover'),
      borderColor: d('border-default-grey'),
    },

    mask: {
      // Fond des modales DSFR (`.fr-modal`).
      background: 'rgba(22, 22, 22, 0.64)',
    },

    navigation: {
      item: {
        focusBackground: d('background-overlap-grey-hover'),
        activeBackground: d('background-open-blue-france'),
        focusColor: '{text.hover.color}',
        activeColor: d('text-active-blue-france'),
        icon: {
          focusColor: '{text.hover.muted.color}',
          activeColor: d('text-active-blue-france'),
        },
      },
      submenuIcon: {
        focusColor: '{text.hover.muted.color}',
      },
    },

    overlay: {
      select: {
        borderRadius: '{border.radius.none}',
        shadow: dsfrShadow('overlap'),
        background: d('background-overlap-grey'),
        borderColor: d('border-default-grey'),
      },
      popover: {
        borderRadius: '{border.radius.none}',
        shadow: dsfrShadow('overlap'),
        background: d('background-overlap-grey'),
        borderColor: d('border-default-grey'),
      },
      modal: {
        borderRadius: '{border.radius.none}',
        shadow: dsfrShadow('lifted'),
        background: d('background-lifted-grey'),
        borderColor: d('border-default-grey'),
      },
      navigation: {
        shadow: dsfrShadow('overlap'),
      },
    },
  };
}
