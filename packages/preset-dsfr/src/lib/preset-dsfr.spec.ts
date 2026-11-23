import { PresetDsfr } from './preset-dsfr';

type LightPrimary = {
  colorScheme: { light: { primary: { color: string } } };
};

describe('PresetDsfr', () => {
  it('utilise le bleu France comme couleur primaire en mode clair', () => {
    const semantic = PresetDsfr.semantic as unknown as LightPrimary;
    expect(semantic.colorScheme.light.primary.color).toBe('{blueFrance.800}');
  });
});
