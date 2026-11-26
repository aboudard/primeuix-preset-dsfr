import type { Preset } from '@primeuix/themes';
import { dsfrDecision, type DecisionOptions } from '../decision.js';
import type { DsfrDecisionToken } from '../tokens/generated/index.js';

export type ComponentsOptions = DecisionOptions;

/**
 * Surcharges de tokens par composant (`components/<nom>.ts`, phase 4).
 * Clé = nom du composant Prime (`button`, `inputtext`…).
 *
 * Phase 3 : la case à cocher, le bouton radio et l'interrupteur héritent dans
 * Nora des tokens `formField` (fond, bordure, ombre). Le champ DSFR (fond gris,
 * pas de bordure, trait bas en ombre) les rendrait illisibles : on leur rend
 * une bordure bleu France sur fond neutre, sans trait bas. Le rendu fin de ces
 * composants viendra au lot 1 de la phase 4.
 *
 * De même, les boutons de Nora prennent le rayon des champs
 * (`{form.field.border.radius}`) : on les remet à angles droits, comme
 * `.fr-btn`.
 */
export function createComponents(
  options: ComponentsOptions = {},
): NonNullable<Preset['components']> {
  const d = (name: DsfrDecisionToken) => dsfrDecision(name, options);
  const choice = {
    background: d('background-default-grey'),
    borderColor: d('border-action-high-blue-france'),
    hoverBorderColor: d('border-action-high-blue-france'),
    focusBorderColor: d('border-action-high-blue-france'),
    checkedDisabledBorderColor: d('border-disabled-grey'),
    shadow: 'none',
  };

  const square = { root: { borderRadius: '{border.radius.none}' } };

  return {
    button: square,
    splitbutton: square,
    selectbutton: square,
    checkbox: {
      root: { ...choice, borderRadius: '0.25rem' },
    },
    radiobutton: {
      root: {
        ...choice,
        checkedBorderColor: d('border-action-high-blue-france'),
        checkedHoverBorderColor: d('border-action-high-blue-france'),
        checkedFocusBorderColor: d('border-action-high-blue-france'),
      },
    },
    toggleswitch: {
      root: {
        ...choice,
        hoverBackground: d('background-default-grey'),
      },
      handle: {
        background: d('border-action-high-blue-france'),
        hoverBackground: d('border-action-high-blue-france'),
      },
    },
  };
}
