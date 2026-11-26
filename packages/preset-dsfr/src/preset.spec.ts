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

  it('dérive surface, texte et champs des tokens décisionnels DSFR', () => {
    const sem = semantic(PresetDsfr);
    expect(sem['surface']['0']).toBe('{grey.0}');
    expect(sem['surface']['950']).toBe('{grey.950}');
    expect((sem['text'] as Tokens)['color']).toBe(
      'light-dark({grey.700}, {grey.400})',
    );
    expect(sem['formField']).toMatchObject({
      background: 'light-dark({grey.100}, #242424)',
      color: 'light-dark({grey.700}, {grey.400})',
      borderRadius: '0.25rem 0.25rem 0 0',
      borderColor: 'transparent',
      shadow: 'inset 0 -2px 0 0 light-dark({grey.700}, {grey.400})',
    });
    expect(sem['primary']['hoverColor']).toBe(
      'light-dark({blueFrance.700}, #b1b1f9)',
    );
    expect(sem['primary']['contrastColor']).toBe(
      'light-dark({blueFrance.50}, {blueFrance.800})',
    );
  });

  it('utilise la police Marianne et le corps DSFR', () => {
    expect(semantic(PresetDsfr)['typography']).toMatchObject({
      fontFamily: '"Marianne", arial, sans-serif',
      fontSize: '1rem',
    });
  });

  it('garde les boutons à angles droits malgré le rayon des champs', () => {
    const comps = (PresetDsfr as { components: Tokens }).components;
    expect(
      (comps['button'] as Record<string, Record<string, unknown>>)['root'][
        'borderRadius'
      ],
    ).toBe('{border.radius.none}');
  });

  it('a des angles droits par défaut', () => {
    expect(primitive(PresetDsfr)['borderRadius']).toMatchObject({
      xs: '0',
      md: '0',
      xl: '0',
    });
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

  it('renvoie les tokens sémantiques vers les variables décisionnelles', () => {
    const sem = semantic(createPresetDsfr({ bridge: true }));
    expect((sem['text'] as Tokens)['color']).toBe(
      'var(--text-default-grey, light-dark({grey.700}, {grey.400}))',
    );
  });

  it('garde la valeur extraite quand aucune variable ne correspond', () => {
    expect(bridgeColor('#123456', { light: null, dark: null })).toBe('#123456');
  });
});
