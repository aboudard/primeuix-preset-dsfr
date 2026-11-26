# Tokens DSFR extraits

Les tokens du preset sont générés depuis le paquet `@gouvfr/dsfr` par le projet
`tools/extract-dsfr-tokens` :

```sh
npm exec nx -- run extract-dsfr-tokens:extract
```

Sortie : `packages/preset-dsfr/src/tokens/generated/*.ts` (**ne pas éditer à la main**,
relancer l'extraction après une montée de version de `@gouvfr/dsfr`, puis commiter le résultat).
L'extraction est déterministe : deux exécutions successives produisent des fichiers identiques.

## Sources

| Fichier DSFR             | Contenu exploité                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `dist/core/core.css`     | variables `:root` (valeurs **claires**), règles `body`, `.fr-h*`, `.fr-display--*`, `.fr-text--*`, `.fr-m-*`, `a:focus` |
| `dist/scheme/scheme.css` | variables `:root[data-fr-theme=dark]` (valeurs **sombres** des couleurs primitives)                                     |
| `dist/dsfr.css`          | rayons de bordure (`.fr-input`, `.fr-select`, valeurs uniformes des composants)                                         |

## Fichiers générés

| Fichier         | Export           | Contenu                                                                                            |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `meta.ts`       | `DSFR_VERSION`   | version de `@gouvfr/dsfr` source                                                                   |
| `colors.ts`     | `dsfrColors`     | couleurs primitives par famille, `{ light, dark }` par nom DSFR                                    |
| `scales.ts`     | `dsfrScales`     | échelles Prime 50 → 950 par famille (0 → 950 pour `grey`)                                          |
| `scale-vars.ts` | `dsfrScaleVars`  | pour chaque pas : variable DSFR exacte en clair et en sombre (`null` si aucune), pour le mode pont |
| `decisions.ts`  | `dsfrDecisions`  | tokens décisionnels (`background-*`, `text-*`, `border-*`, `artwork-*`) résolus `{ light, dark }`  |
| `typography.ts` | `dsfrTypography` | familles, graisses, corps, titres et « display » (mobile / ≥ 48em), textes                         |
| `spacing.ts`    | `dsfrSpacing`    | espacements `v` (0,25 rem) et `w` (0,5 rem)                                                        |
| `radius.ts`     | `dsfrRadius`     | `none`, `field` (champs), échelle des rayons uniformes                                             |
| `effects.ts`    | `dsfrEffects`    | anneau de focus, ombres `raised` / `overlap` / `lifted` (clair / sombre)                           |

Tous ces exports sont aussi publics depuis `primeuix-preset-dsfr`.

## Lecture des noms de couleurs DSFR

Une couleur primitive DSFR encode **deux niveaux de luminosité** (0 = noir, 1000 = blanc) :
le niveau utilisé en clair, puis celui utilisé en sombre. La variable bascule d'un niveau à
l'autre selon `data-fr-theme`.

| Nom                                       | Clair                  | Sombre                 |
| ----------------------------------------- | ---------------------- | ---------------------- |
| `blue-france-sun-113-625`                 | niveau 113 (`#000091`) | niveau 625 (`#8585f6`) |
| `blue-france-975-75`                      | niveau 975 (`#f5f5fe`) | niveau 75 (`#1b1b35`)  |
| `red-marianne-425-625`                    | niveau 425 (`#c9191e`) | niveau 625 (`#f95c5e`) |
| `green-tilleul-verveine-sun-418-moon-817` | niveau 418             | niveau 817             |
| `blue-france-main-525`                    | niveau 525             | niveau 525 (identique) |

Les suffixes `-hover` / `-active` donnent les états survolé / actif de chaque niveau.
L'extracteur indexe donc chaque famille par niveau, en combinant valeurs claires et sombres.

Le couple **« sun »** d'une famille est sa couleur d'action : niveau clair < 500 et niveau
sombre > 500 (`sun-113-625`, `425-625`, `sun-418-moon-817`…).

## Correspondance vers l'échelle Prime

### Familles colorées (`blueFrance`, `redMarianne`, `info`, `success`, `warning`, `error`, illustratives)

| Prime | Niveau DSFR                                    | Exemple `blueFrance` |
| ----- | ---------------------------------------------- | -------------------- |
| 50    | 975                                            | `#f5f5fe`            |
| 100   | 950                                            | `#ececfe`            |
| 200   | 925                                            | `#e3e3fd`            |
| 300   | 850                                            | `#cacafb`            |
| 400   | « moon » : niveau sombre du couple sun         | `#8585f6` (625)      |
| 500   | `main`                                         | `#6a6af4` (main-525) |
| 600   | couple sun, état **actif** (clair)             | `#2323ff`            |
| 700   | couple sun, état **survolé** (clair)           | `#1212ff`            |
| 800   | couple sun (clair) — **couleur primaire DSFR** | `#000091`            |
| 900   | 125                                            | `#272747`            |
| 950   | 75                                             | `#1b1b35`            |

### Gris (`grey`, destiné aux surfaces)

| Prime       | 0         | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       | 950       |
| ----------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Niveau DSFR | 1000      | 975       | 950       | 925       | 900       | 850       | 625       | 425       | 200       | 125       | 75        | 50        |
| Valeur      | `#ffffff` | `#f6f6f6` | `#eeeeee` | `#e5e5e5` | `#dddddd` | `#cecece` | `#929292` | `#666666` | `#3a3a3a` | `#2a2a2a` | `#1e1e1e` | `#161616` |

### Niveaux absents

Les couleurs système (`info`, `success`, `warning`, `error`) ne définissent ni `925`, ni `850`,
ni `main`, ni `125`. Ces pas sont **interpolés** linéairement (sRGB) entre les deux niveaux
définis les plus proches ; `main` absent est pris au milieu du couple sun (ex. 525 entre
425 et 625). La source de chaque valeur figure en commentaire dans `scales.ts`.

### Limites connues

- Les états survolé / actif du DSFR sont **plus clairs** que la couleur au repos. Pour les
  familles dont `main` est très saturé (ex. `redMarianne` : `main-472` = `#e1000f`), les pas
  600 / 700 sont plus clairs que 500 : l'échelle n'est pas strictement monotone. C'est voulu :
  600 / 700 / 800 restent les vraies couleurs d'action DSFR.
- 900 / 950 sont des teintes sombres désaturées (fonds du mode sombre DSFR), pas des versions
  foncées de la couleur d'action.

## Tokens sémantiques Prime ← tokens décisionnels DSFR

Les tokens sémantiques du preset (`src/semantic.ts`) sont construits avec `dsfrDecision(nom)` :
clair et sombre du token décisionnel DSFR en `light-dark()`, chaque couleur remplacée par le pas
de palette correspondant quand il existe (`#3a3a3a` → `{grey.700}`), sinon gardée en hexadécimal
(états hover / active du mode sombre, absents des échelles). En mode pont, la valeur est
enveloppée dans `var(--<token décisionnel>, …)`.

| Token Prime                                                      | Token DSFR                                                          | Clair / sombre        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------- |
| `primary.color` / `hoverColor` / `activeColor`                   | `background-action-high-blue-france` (+ `-hover`, `-active`)        | `#000091` / `#8585f6` |
| `primary.contrastColor`                                          | `text-inverted-blue-france`                                         | `#f5f5fe` / `#000091` |
| `surface.0` → `surface.950`                                      | échelle `grey` (identique dans les deux thèmes)                     | `#ffffff` → `#161616` |
| `highlight.background` / `focusBackground`                       | `background-active-blue-france` (+ `-hover`)                        | `#000091` / `#8585f6` |
| `highlight.color`                                                | `text-inverted-blue-france`                                         |                       |
| `text.color` / `hoverMutedColor`                                 | `text-default-grey`                                                 | `#3a3a3a` / `#cecece` |
| `text.hoverColor`                                                | `text-title-grey`                                                   | `#161616` / `#ffffff` |
| `text.mutedColor`                                                | `text-mention-grey`                                                 | `#666666` / `#929292` |
| `content.background` / `hoverBackground`                         | `background-default-grey` (+ `-hover`)                              | `#ffffff` / `#161616` |
| `content.borderColor`, `overlay.*.borderColor`                   | `border-default-grey`                                               | `#dddddd` / `#353535` |
| `overlay.select` / `popover` (fond, ombre)                       | `background-overlap-grey`, ombre `overlap`                          |                       |
| `overlay.modal` (fond, ombre)                                    | `background-lifted-grey`, ombre `lifted`                            |                       |
| `list.option.focusBackground`, `navigation.item.focusBackground` | `background-overlap-grey-hover`                                     |                       |
| `navigation.item.activeBackground` / `activeColor`               | `background-open-blue-france` / `text-active-blue-france`           |                       |
| `formField.background` (+ `filled*`)                             | `background-contrast-grey` (+ `-hover`)                             | `#eeeeee` / `#242424` |
| `formField.color`, `iconColor`                                   | `text-default-grey`                                                 |                       |
| `formField.placeholderColor`, `floatLabel*Color`                 | `text-mention-grey`                                                 |                       |
| `formField.disabledBackground` / `disabledColor`                 | `background-disabled-grey` / `text-disabled-grey`                   |                       |
| `formField.invalidBorderColor`                                   | `border-plain-error`                                                | `#ce0500` / `#ff5655` |
| `formField.shadow`                                               | `inset 0 -2px 0 0` + `border-plain-grey` (trait bas de `.fr-input`) | `#3a3a3a` / `#cecece` |

Valeurs fixes (non colorées) :

| Token Prime                            | Valeur                              | Source DSFR                      |
| -------------------------------------- | ----------------------------------- | -------------------------------- |
| `typography.fontFamily`                | `"Marianne", arial, sans-serif`     | `dsfrTypography.fontFamily.base` |
| `typography.fontSize` / `lineHeight`   | `1rem` / `1.5`                      | corps DSFR (`1rem` / `1.5rem`)   |
| `formField.fontSize` (`sm`, `lg`)      | `1rem` (`0.875rem`, `1.125rem`)     | corps, `text.sm`, `text.lg`      |
| `formField.paddingX` / `paddingY`      | `1rem` / `0.5rem`                   | `.fr-input` (hauteur 2,5 rem)    |
| `formField.borderRadius`               | `0.25rem 0.25rem 0 0`               | `dsfrRadius.field`               |
| `formField.borderColor` (hover, focus) | `transparent`                       | `.fr-input` n'a pas de bordure   |
| `focusRing`, `formField.focusRing`     | `2px solid #0a76f6`, décalage `2px` | `dsfrEffects.focusRing`          |
| `borderRadius.*` (primitive)           | `0`                                 | angles droits du DSFR            |
| `mask.background`                      | `rgba(22, 22, 22, 0.64)`            | fond de `.fr-modal`              |
| `iconSize`                             | `1rem`                              |                                  |

Les ombres DSFR ne diffèrent entre clair et sombre que par leur couleur : `dsfrShadow()` la passe
en `light-dark()` (`0 2px 6px light-dark(rgba(0, 0, 18, 0.16), rgba(0, 0, 18, 0.32))`).

Dans Nora, la case à cocher, le bouton radio et l'interrupteur réutilisent les tokens
`formField` (fond, bordure, ombre). Pour qu'ils restent lisibles avec le champ DSFR, ils reçoivent
dès maintenant une surcharge minimale dans `src/components/index.ts` : fond
`background-default-grey`, bordure `border-action-high-blue-france`, sans trait bas.
De même, `button`, `splitbutton` et `selectbutton` prennent dans Nora le rayon des champs
(`{form.field.border.radius}`) : ils sont remis à angles droits (`{border.radius.none}`), comme
`.fr-btn`.
