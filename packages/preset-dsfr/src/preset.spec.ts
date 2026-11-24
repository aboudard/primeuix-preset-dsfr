import { createPresetDsfr, PresetDsfr } from './preset.js';
import { bridgeColor } from './primitive.js';

type Tokens = Record<string, Record<string, unknown>>;
const primitive = (preset: unknown) =>
  (preset as { primitive: Tokens }).primitive;
const semantic = (preset: unknown) => (preset as { semantic: Tokens }).semantic;

describe('PresetDsfr', () => {
  it('utilise le bleu France comme couleur primaire, clair et sombre', () => {
    expect(semantic(PresetDsfr)['primary']['color']).toBe(
      'light-dark({blueFrance.800}, {blueFrance.400})',
    );
  });

  it('déclare les palettes DSFR en valeurs autonomes par défaut', () => {
    expect(primitive(PresetDsfr)['blueFrance']['800']).toBe('#000091');
    expect(primitive(PresetDsfr)['grey']['0']).toBe('#ffffff');
  });

  it('applique l’anneau de focus DSFR', () => {
    expect(semantic(PresetDsfr)['focusRing']).toMatchObject({
      color: '#0a76f6',
      width: '2px',
      offset: '2px',
    });
  });
});

describe('mode pont', () => {
  const bridged = primitive(createPresetDsfr({ bridge: true }));

  it('renvoie vers la variable DSFR exacte de chaque thème', () => {
    expect(bridged['blueFrance']['800']).toBe(
      'light-dark(var(--blue-france-sun-113-625, #000091), var(--blue-france-975-sun-113, #000091))',
    );
    expect(bridged['blueFrance']['400']).toBe(
      'light-dark(#8585f6, var(--blue-france-sun-113-625, #8585f6))',
    );
    expect(bridged['blueFrance']['500']).toBe(
      'var(--blue-france-main-525, #6a6af4)',
    );
  });

  it('garde la valeur extraite quand aucune variable ne correspond', () => {
    expect(bridgeColor('#123456', { light: null, dark: null })).toBe('#123456');
  });
});
