# primeuix-preset-dsfr

Preset de thème [primeuix](https://primeng.dev/theming/styled) qui reprend l'apparence du
[Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/) pour **PrimeNG**,
**PrimeVue** et **PrimeReact** (les trois consomment `@primeuix/themes`).

> **Projet non officiel.** Ce preset n'est ni produit ni validé par le Service d'information du
> Gouvernement. L'identité visuelle de l'État (Marianne, bloc-marque) est **réservée aux sites de
> l'État** : n'utilisez ce preset que dans ce cadre.

## Installation

```sh
npm install primeuix-preset-dsfr @primeuix/themes
```

`@primeuix/themes` (≥ 3.1) est une dépendance pair. Le paquet est **ESM uniquement**, typé, sans
effet de bord (`sideEffects: false`).

> **Licence PrimeUI** : PrimeNG 22, PrimeVue 5, PrimeReact 11 et `@primeuix/themes` sont sous
> _PrimeUI License_, plus sous MIT. Une clé est nécessaire (sinon un bandeau « Invalid PrimeUI
> License » s'affiche) et un usage professionnel demande une licence commerciale. Le présent preset
> est sous licence MIT, mais n'a d'intérêt qu'avec ces bibliothèques.

## Utilisation

### PrimeNG

```ts
import { providePrimeNG } from 'primeng/config';
import { PresetDsfr } from 'primeuix-preset-dsfr';

providePrimeNG({
  theme: {
    preset: PresetDsfr,
    options: { darkModeSelector: '[data-fr-theme="dark"]' },
  },
});
```

### PrimeVue

```ts
import PrimeVue from 'primevue/config';
import { PresetDsfr } from 'primeuix-preset-dsfr';

app.use(PrimeVue, {
  theme: {
    preset: PresetDsfr,
    options: { darkModeSelector: '[data-fr-theme="dark"]' },
  },
});
```

### PrimeReact

Passez `PresetDsfr` à l'option `theme.preset` du fournisseur de configuration PrimeReact, avec les
mêmes `options` que ci-dessus. L'intégration PrimeReact 11 n'est pas encore vérifiée dans ce dépôt
(démo React prévue en phase 6).

### Mode sombre

Utilisez `darkModeSelector: '[data-fr-theme="dark"]'`, le sélecteur du DSFR : un même attribut
`data-fr-theme` sur `<html>` bascule alors le DSFR et Prime. Les tokens du preset passent par
`light-dark()` (comme Nora), qui suit le `color-scheme` posé par Prime.

### Rendu global

Sans retouche par composant, le preset applique déjà : bleu France en couleur primaire (repos /
survol / actif DSFR, clair et sombre), surfaces et textes gris DSFR, angles droits, anneau de
focus `2px solid #0a76f6` décalé de `2px`, police et corps DSFR (`1rem`), champs DSFR (fond
`background-contrast-grey`, sans bordure, trait bas de 2 px porté par le token `formField.shadow`,
rayon `0.25rem 0.25rem 0 0`). Les variantes et états fins des composants (boutons secondaires,
messages, onglets, tags…) viennent composant par composant.

### Police

Marianne **n'est pas embarquée** (marque de l'État). La pile utilisée est
`Marianne, arial, sans-serif` : chargez la police dans l'application (par exemple via `dsfr.css`,
qui la déclare).

## API

| Export                                                                                                                                     | Rôle                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `PresetDsfr`                                                                                                                               | Preset prêt à l'emploi, valeurs autonomes (= `createPresetDsfr()`).                                   |
| `createPresetDsfr(options?)`                                                                                                               | Crée le preset. Options : voir ci-dessous.                                                            |
| `PresetDsfrOptions`                                                                                                                        | Type des options.                                                                                     |
| `createPalettes(options?)`                                                                                                                 | Palettes DSFR au format Prime (`blueFrance`, `grey`…), utiles pour un preset dérivé.                  |
| `bridgeColor(hex, vars)`                                                                                                                   | Valeur « pont » d'une couleur (voir mode pont).                                                       |
| `dsfrDecision(name, options?)`, `dsfrShadow(name)`, `paletteRef(hex)`                                                                      | Valeur Prime d'un token décisionnel DSFR (`light-dark()` de références de palette), d'une ombre DSFR. |
| `dsfrScales`, `dsfrScaleVars`, `dsfrColors`, `dsfrDecisions`, `dsfrTypography`, `dsfrSpacing`, `dsfrRadius`, `dsfrEffects`, `DSFR_VERSION` | Tokens extraits de `@gouvfr/dsfr` (voir `docs/TOKENS.md` du dépôt).                                   |

```ts
import { dsfrDecisions, dsfrScales, DSFR_VERSION } from 'primeuix-preset-dsfr';

dsfrScales.blueFrance[800]; // '#000091'
dsfrDecisions['text-default-grey']; // { light: '#3a3a3a', dark: '#cecece' }
```

Pour personnaliser, partez du preset avec `definePreset` de `@primeuix/themes` :

```ts
import { definePreset } from '@primeuix/themes';
import { PresetDsfr } from 'primeuix-preset-dsfr';

const MyPreset = definePreset(PresetDsfr, {
  components: { button: { root: { borderRadius: '0' } } },
});
```

### Options de `createPresetDsfr`

| Option   | Défaut  | Effet                                                                                    |
| -------- | ------- | ---------------------------------------------------------------------------------------- |
| `bridge` | `false` | Mode « pont » : palettes et tokens sémantiques renvoient vers les variables CSS du DSFR. |

## Mode pont (`bridge: true`)

À utiliser quand l'application charge **déjà** `dsfr.css`. Chaque pas de palette renvoie vers la
variable DSFR correspondante, avec la valeur extraite en repli : le preset suit alors les couleurs
effectivement servies (autre version du DSFR, surcharges de l'application).

Les variables primitives du DSFR **changent de valeur avec le thème** (`--blue-france-sun-113-625`
vaut `#000091` en clair et `#8585f6` en sombre), alors qu'une primitive Prime est fixe. Le pont
choisit donc, pour chaque thème, la variable qui vaut exactement le pas, et les combine avec
`light-dark()` :

```css
/* blueFrance.800 */
light-dark(var(--blue-france-sun-113-625, #000091), var(--blue-france-975-sun-113, #000091))
/* blueFrance.500 : même variable dans les deux thèmes */
var(--blue-france-main-525, #6a6af4)
```

Les tokens sémantiques (texte, surfaces de contenu, champs…) sont dérivés des **tokens
décisionnels** du DSFR. En mode pont, ils renvoient directement vers la variable décisionnelle, qui
bascule elle-même avec `data-fr-theme` :

```css
/* text.color */
var(--text-default-grey, light-dark(var(--p-grey-700), var(--p-grey-400)))
```

Un pas sans variable DSFR exacte dans un thème (pas interpolé, niveau absent) garde sa valeur
hexadécimale. Le pont suppose `darkModeSelector: '[data-fr-theme="dark"]'`.

## Couches CSS (`cssLayer`)

`dsfr.css` n'est pas déclaré dans une couche CSS (`@layer`). Or des styles **hors couche l'emportent
sur tout style en couche** : si Prime est placé dans une couche et pas le DSFR, les styles
d'éléments du DSFR (`button`, `input`, liens, focus) écrasent les composants Prime (fond de bouton
transparent, champs sans bordure — constaté dans la démo).

| Situation       | Recommandation                                                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sans `dsfr.css` | `cssLayer: false` (défaut) suffit.                                                                                                                 |
| Avec `dsfr.css` | Charger le DSFR **dans une couche** et la placer sous celle de Prime ; garder les styles de l'application hors couche pour qu'ils gardent la main. |

```css
/* styles globaux de l'application */
@import '@gouvfr/dsfr/dist/dsfr.min.css' layer(dsfr);
```

```ts
theme: {
  preset: createPresetDsfr({ bridge: true }),
  options: {
    darkModeSelector: '[data-fr-theme="dark"]',
    cssLayer: { name: 'primeng', order: 'dsfr, primeng' },
  },
}
```

Les variables `--blue-france-*` du DSFR restent visibles par le preset quelle que soit leur couche.
La démo du dépôt applique ce montage avec l'URL `?bridge`.

## Développement

- `nx build preset-dsfr` : build ESM + `.d.ts` dans `dist/packages/preset-dsfr`.
- `nx test preset-dsfr` : tests unitaires (Vitest).
- `nx run extract-dsfr-tokens:extract` : régénère `src/tokens/generated/` depuis `@gouvfr/dsfr`
  (fichiers à ne pas éditer à la main).
