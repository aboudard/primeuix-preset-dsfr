# preset-dsfr

Preset [primeuix](https://primeng.dev/theming/styled) reprenant l'apparence du Système de Design
de l'État (DSFR), pour PrimeNG, PrimeVue et PrimeReact.

## Tokens DSFR

Les primitives du preset (palettes, focus…) proviennent de fichiers **générés** depuis
`@gouvfr/dsfr` (`src/tokens/generated/`, ne pas éditer à la main). Ils sont aussi exportés :

```ts
import { dsfrDecisions, dsfrScales, DSFR_VERSION } from 'primeuix-preset-dsfr';

dsfrScales.blueFrance[800]; // '#000091'
dsfrDecisions['text-default-grey']; // { light: '#3a3a3a', dark: '#cecece' }
```

Régénération et table de correspondance DSFR → Prime : voir `docs/TOKENS.md` à la racine du dépôt.

## Building

Run `nx build preset-dsfr` to build the library.

## Running unit tests

Run `nx test preset-dsfr` to execute the unit tests via [Vitest](https://vitest.dev/).
