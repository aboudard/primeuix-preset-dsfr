import { dsfrDecision, dsfrShadow, paletteRef } from './decision.js';

describe('dsfrDecision', () => {
  it('combine clair et sombre en références de palette', () => {
    expect(dsfrDecision('background-default-grey')).toBe(
      'light-dark({grey.0}, {grey.950})',
    );
  });

  it('garde une seule valeur quand clair et sombre sont identiques', () => {
    expect(dsfrDecision('border-default-blue-france')).toBe('{blueFrance.500}');
  });

  it('garde la couleur brute hors palette', () => {
    expect(paletteRef('#123456')).toBe('#123456');
  });

  it('enveloppe la valeur dans la variable DSFR en mode pont', () => {
    expect(dsfrDecision('border-default-blue-france', { bridge: true })).toBe(
      'var(--border-default-blue-france, {blueFrance.500})',
    );
  });
});

describe('dsfrShadow', () => {
  it('passe la couleur de l’ombre en light-dark()', () => {
    expect(dsfrShadow('overlap')).toBe(
      '0 2px 6px light-dark(rgba(0, 0, 18, 0.16), rgba(0, 0, 18, 0.32))',
    );
  });
});
