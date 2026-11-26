/**
 * Fichier généré par `nx run extract-dsfr-tokens:extract` : ne pas éditer à la main.
 * Source : @gouvfr/dsfr 1.15.4 (dist/core/core.css, dist/scheme/scheme.css).
 */

/** Pour chaque pas de `dsfrScales` : variable CSS DSFR (sans `--`) qui vaut exactement ce pas en thème clair (`light`) et en thème sombre (`dark`) ; `null` si aucune (pas interpolé ou niveau absent dans ce mode). Sert au mode « pont » du preset. */
export const dsfrScaleVars = {
  grey: {
    0: {
      light: 'grey-1000-50',
      dark: 'grey-50-1000',
    },
    50: {
      light: 'grey-975-75',
      dark: null,
    },
    100: {
      light: 'grey-950-100',
      dark: null,
    },
    200: {
      light: 'grey-925-125',
      dark: null,
    },
    300: {
      light: 'grey-900-175',
      dark: null,
    },
    400: {
      light: null,
      dark: 'grey-200-850',
    },
    500: {
      light: 'grey-625-425',
      dark: 'grey-425-625',
    },
    600: {
      light: 'grey-425-625',
      dark: 'grey-625-425',
    },
    700: {
      light: 'grey-200-850',
      dark: null,
    },
    800: {
      light: null,
      dark: 'grey-925-125',
    },
    900: {
      light: null,
      dark: 'grey-975-75',
    },
    950: {
      light: 'grey-50-1000',
      dark: 'grey-1000-50',
    },
  },
  blueFrance: {
    50: {
      light: 'blue-france-975-75',
      dark: null,
    },
    100: {
      light: 'blue-france-950-100',
      dark: null,
    },
    200: {
      light: 'blue-france-925-125',
      dark: null,
    },
    300: {
      light: 'blue-france-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'blue-france-sun-113-625',
    },
    500: {
      light: 'blue-france-main-525',
      dark: 'blue-france-main-525',
    },
    600: {
      light: 'blue-france-sun-113-625-active',
      dark: null,
    },
    700: {
      light: 'blue-france-sun-113-625-hover',
      dark: null,
    },
    800: {
      light: 'blue-france-sun-113-625',
      dark: 'blue-france-975-sun-113',
    },
    900: {
      light: null,
      dark: 'blue-france-925-125',
    },
    950: {
      light: null,
      dark: 'blue-france-975-75',
    },
  },
  redMarianne: {
    50: {
      light: 'red-marianne-975-75',
      dark: null,
    },
    100: {
      light: 'red-marianne-950-100',
      dark: null,
    },
    200: {
      light: 'red-marianne-925-125',
      dark: null,
    },
    300: {
      light: 'red-marianne-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'red-marianne-425-625',
    },
    500: {
      light: 'red-marianne-main-472',
      dark: 'red-marianne-main-472',
    },
    600: {
      light: 'red-marianne-425-625-active',
      dark: null,
    },
    700: {
      light: 'red-marianne-425-625-hover',
      dark: null,
    },
    800: {
      light: 'red-marianne-425-625',
      dark: null,
    },
    900: {
      light: null,
      dark: 'red-marianne-925-125',
    },
    950: {
      light: null,
      dark: 'red-marianne-975-75',
    },
  },
  info: {
    50: {
      light: 'info-975-75',
      dark: null,
    },
    100: {
      light: 'info-950-100',
      dark: null,
    },
    200: {
      light: null,
      dark: null,
    },
    300: {
      light: null,
      dark: null,
    },
    400: {
      light: null,
      dark: 'info-425-625',
    },
    500: {
      light: null,
      dark: null,
    },
    600: {
      light: 'info-425-625-active',
      dark: null,
    },
    700: {
      light: 'info-425-625-hover',
      dark: null,
    },
    800: {
      light: 'info-425-625',
      dark: null,
    },
    900: {
      light: null,
      dark: null,
    },
    950: {
      light: null,
      dark: 'info-975-75',
    },
  },
  success: {
    50: {
      light: 'success-975-75',
      dark: null,
    },
    100: {
      light: 'success-950-100',
      dark: null,
    },
    200: {
      light: null,
      dark: null,
    },
    300: {
      light: null,
      dark: null,
    },
    400: {
      light: null,
      dark: 'success-425-625',
    },
    500: {
      light: null,
      dark: null,
    },
    600: {
      light: 'success-425-625-active',
      dark: null,
    },
    700: {
      light: 'success-425-625-hover',
      dark: null,
    },
    800: {
      light: 'success-425-625',
      dark: null,
    },
    900: {
      light: null,
      dark: null,
    },
    950: {
      light: null,
      dark: 'success-975-75',
    },
  },
  warning: {
    50: {
      light: 'warning-975-75',
      dark: null,
    },
    100: {
      light: 'warning-950-100',
      dark: null,
    },
    200: {
      light: null,
      dark: null,
    },
    300: {
      light: null,
      dark: null,
    },
    400: {
      light: null,
      dark: 'warning-425-625',
    },
    500: {
      light: null,
      dark: null,
    },
    600: {
      light: 'warning-425-625-active',
      dark: null,
    },
    700: {
      light: 'warning-425-625-hover',
      dark: null,
    },
    800: {
      light: 'warning-425-625',
      dark: null,
    },
    900: {
      light: null,
      dark: null,
    },
    950: {
      light: null,
      dark: 'warning-975-75',
    },
  },
  error: {
    50: {
      light: 'error-975-75',
      dark: null,
    },
    100: {
      light: 'error-950-100',
      dark: null,
    },
    200: {
      light: null,
      dark: null,
    },
    300: {
      light: null,
      dark: null,
    },
    400: {
      light: null,
      dark: 'error-425-625',
    },
    500: {
      light: null,
      dark: null,
    },
    600: {
      light: 'error-425-625-active',
      dark: null,
    },
    700: {
      light: 'error-425-625-hover',
      dark: null,
    },
    800: {
      light: 'error-425-625',
      dark: null,
    },
    900: {
      light: null,
      dark: null,
    },
    950: {
      light: null,
      dark: 'error-975-75',
    },
  },
  greenTilleulVerveine: {
    50: {
      light: 'green-tilleul-verveine-975-75',
      dark: null,
    },
    100: {
      light: 'green-tilleul-verveine-950-100',
      dark: null,
    },
    200: {
      light: 'green-tilleul-verveine-925-125',
      dark: null,
    },
    300: {
      light: 'green-tilleul-verveine-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'green-tilleul-verveine-sun-418-moon-817',
    },
    500: {
      light: 'green-tilleul-verveine-main-707',
      dark: 'green-tilleul-verveine-main-707',
    },
    600: {
      light: 'green-tilleul-verveine-sun-418-moon-817-active',
      dark: null,
    },
    700: {
      light: 'green-tilleul-verveine-sun-418-moon-817-hover',
      dark: null,
    },
    800: {
      light: 'green-tilleul-verveine-sun-418-moon-817',
      dark: null,
    },
    900: {
      light: null,
      dark: 'green-tilleul-verveine-925-125',
    },
    950: {
      light: null,
      dark: 'green-tilleul-verveine-975-75',
    },
  },
  greenBourgeon: {
    50: {
      light: 'green-bourgeon-975-75',
      dark: null,
    },
    100: {
      light: 'green-bourgeon-950-100',
      dark: null,
    },
    200: {
      light: 'green-bourgeon-925-125',
      dark: null,
    },
    300: {
      light: 'green-bourgeon-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'green-bourgeon-sun-425-moon-759',
    },
    500: {
      light: 'green-bourgeon-main-640',
      dark: 'green-bourgeon-main-640',
    },
    600: {
      light: 'green-bourgeon-sun-425-moon-759-active',
      dark: null,
    },
    700: {
      light: 'green-bourgeon-sun-425-moon-759-hover',
      dark: null,
    },
    800: {
      light: 'green-bourgeon-sun-425-moon-759',
      dark: null,
    },
    900: {
      light: null,
      dark: 'green-bourgeon-925-125',
    },
    950: {
      light: null,
      dark: 'green-bourgeon-975-75',
    },
  },
  greenEmeraude: {
    50: {
      light: 'green-emeraude-975-75',
      dark: null,
    },
    100: {
      light: 'green-emeraude-950-100',
      dark: null,
    },
    200: {
      light: 'green-emeraude-925-125',
      dark: null,
    },
    300: {
      light: 'green-emeraude-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'green-emeraude-sun-425-moon-753',
    },
    500: {
      light: 'green-emeraude-main-632',
      dark: 'green-emeraude-main-632',
    },
    600: {
      light: 'green-emeraude-sun-425-moon-753-active',
      dark: null,
    },
    700: {
      light: 'green-emeraude-sun-425-moon-753-hover',
      dark: null,
    },
    800: {
      light: 'green-emeraude-sun-425-moon-753',
      dark: null,
    },
    900: {
      light: null,
      dark: 'green-emeraude-925-125',
    },
    950: {
      light: null,
      dark: 'green-emeraude-975-75',
    },
  },
  greenMenthe: {
    50: {
      light: 'green-menthe-975-75',
      dark: null,
    },
    100: {
      light: 'green-menthe-950-100',
      dark: null,
    },
    200: {
      light: 'green-menthe-925-125',
      dark: null,
    },
    300: {
      light: 'green-menthe-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'green-menthe-sun-373-moon-652',
    },
    500: {
      light: 'green-menthe-main-548',
      dark: 'green-menthe-main-548',
    },
    600: {
      light: 'green-menthe-sun-373-moon-652-active',
      dark: null,
    },
    700: {
      light: 'green-menthe-sun-373-moon-652-hover',
      dark: null,
    },
    800: {
      light: 'green-menthe-sun-373-moon-652',
      dark: null,
    },
    900: {
      light: null,
      dark: 'green-menthe-925-125',
    },
    950: {
      light: null,
      dark: 'green-menthe-975-75',
    },
  },
  greenArchipel: {
    50: {
      light: 'green-archipel-975-75',
      dark: null,
    },
    100: {
      light: 'green-archipel-950-100',
      dark: null,
    },
    200: {
      light: 'green-archipel-925-125',
      dark: null,
    },
    300: {
      light: 'green-archipel-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'green-archipel-sun-391-moon-716',
    },
    500: {
      light: 'green-archipel-main-557',
      dark: 'green-archipel-main-557',
    },
    600: {
      light: 'green-archipel-sun-391-moon-716-active',
      dark: null,
    },
    700: {
      light: 'green-archipel-sun-391-moon-716-hover',
      dark: null,
    },
    800: {
      light: 'green-archipel-sun-391-moon-716',
      dark: null,
    },
    900: {
      light: null,
      dark: 'green-archipel-925-125',
    },
    950: {
      light: null,
      dark: 'green-archipel-975-75',
    },
  },
  blueEcume: {
    50: {
      light: 'blue-ecume-975-75',
      dark: null,
    },
    100: {
      light: 'blue-ecume-950-100',
      dark: null,
    },
    200: {
      light: 'blue-ecume-925-125',
      dark: null,
    },
    300: {
      light: 'blue-ecume-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'blue-ecume-sun-247-moon-675',
    },
    500: {
      light: 'blue-ecume-main-400',
      dark: 'blue-ecume-main-400',
    },
    600: {
      light: 'blue-ecume-sun-247-moon-675-active',
      dark: null,
    },
    700: {
      light: 'blue-ecume-sun-247-moon-675-hover',
      dark: null,
    },
    800: {
      light: 'blue-ecume-sun-247-moon-675',
      dark: null,
    },
    900: {
      light: null,
      dark: 'blue-ecume-925-125',
    },
    950: {
      light: null,
      dark: 'blue-ecume-975-75',
    },
  },
  blueCumulus: {
    50: {
      light: 'blue-cumulus-975-75',
      dark: null,
    },
    100: {
      light: 'blue-cumulus-950-100',
      dark: null,
    },
    200: {
      light: 'blue-cumulus-925-125',
      dark: null,
    },
    300: {
      light: 'blue-cumulus-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'blue-cumulus-sun-368-moon-732',
    },
    500: {
      light: 'blue-cumulus-main-526',
      dark: 'blue-cumulus-main-526',
    },
    600: {
      light: 'blue-cumulus-sun-368-moon-732-active',
      dark: null,
    },
    700: {
      light: 'blue-cumulus-sun-368-moon-732-hover',
      dark: null,
    },
    800: {
      light: 'blue-cumulus-sun-368-moon-732',
      dark: null,
    },
    900: {
      light: null,
      dark: 'blue-cumulus-925-125',
    },
    950: {
      light: null,
      dark: 'blue-cumulus-975-75',
    },
  },
  purpleGlycine: {
    50: {
      light: 'purple-glycine-975-75',
      dark: null,
    },
    100: {
      light: 'purple-glycine-950-100',
      dark: null,
    },
    200: {
      light: 'purple-glycine-925-125',
      dark: null,
    },
    300: {
      light: 'purple-glycine-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'purple-glycine-sun-319-moon-630',
    },
    500: {
      light: 'purple-glycine-main-494',
      dark: 'purple-glycine-main-494',
    },
    600: {
      light: 'purple-glycine-sun-319-moon-630-active',
      dark: null,
    },
    700: {
      light: 'purple-glycine-sun-319-moon-630-hover',
      dark: null,
    },
    800: {
      light: 'purple-glycine-sun-319-moon-630',
      dark: null,
    },
    900: {
      light: null,
      dark: 'purple-glycine-925-125',
    },
    950: {
      light: null,
      dark: 'purple-glycine-975-75',
    },
  },
  pinkMacaron: {
    50: {
      light: 'pink-macaron-975-75',
      dark: null,
    },
    100: {
      light: 'pink-macaron-950-100',
      dark: null,
    },
    200: {
      light: 'pink-macaron-925-125',
      dark: null,
    },
    300: {
      light: 'pink-macaron-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'pink-macaron-sun-406-moon-833',
    },
    500: {
      light: 'pink-macaron-main-689',
      dark: 'pink-macaron-main-689',
    },
    600: {
      light: 'pink-macaron-sun-406-moon-833-active',
      dark: null,
    },
    700: {
      light: 'pink-macaron-sun-406-moon-833-hover',
      dark: null,
    },
    800: {
      light: 'pink-macaron-sun-406-moon-833',
      dark: null,
    },
    900: {
      light: null,
      dark: 'pink-macaron-925-125',
    },
    950: {
      light: null,
      dark: 'pink-macaron-975-75',
    },
  },
  pinkTuile: {
    50: {
      light: 'pink-tuile-975-75',
      dark: null,
    },
    100: {
      light: 'pink-tuile-950-100',
      dark: null,
    },
    200: {
      light: 'pink-tuile-925-125',
      dark: null,
    },
    300: {
      light: 'pink-tuile-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'pink-tuile-sun-425-moon-750',
    },
    500: {
      light: 'pink-tuile-main-556',
      dark: 'pink-tuile-main-556',
    },
    600: {
      light: 'pink-tuile-sun-425-moon-750-active',
      dark: null,
    },
    700: {
      light: 'pink-tuile-sun-425-moon-750-hover',
      dark: null,
    },
    800: {
      light: 'pink-tuile-sun-425-moon-750',
      dark: null,
    },
    900: {
      light: null,
      dark: 'pink-tuile-925-125',
    },
    950: {
      light: null,
      dark: 'pink-tuile-975-75',
    },
  },
  yellowTournesol: {
    50: {
      light: 'yellow-tournesol-975-75',
      dark: null,
    },
    100: {
      light: 'yellow-tournesol-950-100',
      dark: null,
    },
    200: {
      light: 'yellow-tournesol-925-125',
      dark: null,
    },
    300: {
      light: 'yellow-tournesol-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'yellow-tournesol-sun-407-moon-922',
    },
    500: {
      light: 'yellow-tournesol-main-731',
      dark: 'yellow-tournesol-main-731',
    },
    600: {
      light: 'yellow-tournesol-sun-407-moon-922-active',
      dark: null,
    },
    700: {
      light: 'yellow-tournesol-sun-407-moon-922-hover',
      dark: null,
    },
    800: {
      light: 'yellow-tournesol-sun-407-moon-922',
      dark: null,
    },
    900: {
      light: null,
      dark: 'yellow-tournesol-925-125',
    },
    950: {
      light: null,
      dark: 'yellow-tournesol-975-75',
    },
  },
  yellowMoutarde: {
    50: {
      light: 'yellow-moutarde-975-75',
      dark: null,
    },
    100: {
      light: 'yellow-moutarde-950-100',
      dark: null,
    },
    200: {
      light: 'yellow-moutarde-925-125',
      dark: null,
    },
    300: {
      light: 'yellow-moutarde-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'yellow-moutarde-sun-348-moon-860',
    },
    500: {
      light: 'yellow-moutarde-main-679',
      dark: 'yellow-moutarde-main-679',
    },
    600: {
      light: 'yellow-moutarde-sun-348-moon-860-active',
      dark: null,
    },
    700: {
      light: 'yellow-moutarde-sun-348-moon-860-hover',
      dark: null,
    },
    800: {
      light: 'yellow-moutarde-sun-348-moon-860',
      dark: null,
    },
    900: {
      light: null,
      dark: 'yellow-moutarde-925-125',
    },
    950: {
      light: null,
      dark: 'yellow-moutarde-975-75',
    },
  },
  orangeTerreBattue: {
    50: {
      light: 'orange-terre-battue-975-75',
      dark: null,
    },
    100: {
      light: 'orange-terre-battue-950-100',
      dark: null,
    },
    200: {
      light: 'orange-terre-battue-925-125',
      dark: null,
    },
    300: {
      light: 'orange-terre-battue-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'orange-terre-battue-sun-370-moon-672',
    },
    500: {
      light: 'orange-terre-battue-main-645',
      dark: 'orange-terre-battue-main-645',
    },
    600: {
      light: 'orange-terre-battue-sun-370-moon-672-active',
      dark: null,
    },
    700: {
      light: 'orange-terre-battue-sun-370-moon-672-hover',
      dark: null,
    },
    800: {
      light: 'orange-terre-battue-sun-370-moon-672',
      dark: null,
    },
    900: {
      light: null,
      dark: 'orange-terre-battue-925-125',
    },
    950: {
      light: null,
      dark: 'orange-terre-battue-975-75',
    },
  },
  brownCafeCreme: {
    50: {
      light: 'brown-cafe-creme-975-75',
      dark: null,
    },
    100: {
      light: 'brown-cafe-creme-950-100',
      dark: null,
    },
    200: {
      light: 'brown-cafe-creme-925-125',
      dark: null,
    },
    300: {
      light: 'brown-cafe-creme-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'brown-cafe-creme-sun-383-moon-885',
    },
    500: {
      light: 'brown-cafe-creme-main-782',
      dark: 'brown-cafe-creme-main-782',
    },
    600: {
      light: 'brown-cafe-creme-sun-383-moon-885-active',
      dark: null,
    },
    700: {
      light: 'brown-cafe-creme-sun-383-moon-885-hover',
      dark: null,
    },
    800: {
      light: 'brown-cafe-creme-sun-383-moon-885',
      dark: null,
    },
    900: {
      light: null,
      dark: 'brown-cafe-creme-925-125',
    },
    950: {
      light: null,
      dark: 'brown-cafe-creme-975-75',
    },
  },
  brownCaramel: {
    50: {
      light: 'brown-caramel-975-75',
      dark: null,
    },
    100: {
      light: 'brown-caramel-950-100',
      dark: null,
    },
    200: {
      light: 'brown-caramel-925-125',
      dark: null,
    },
    300: {
      light: 'brown-caramel-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'brown-caramel-sun-425-moon-901',
    },
    500: {
      light: 'brown-caramel-main-648',
      dark: 'brown-caramel-main-648',
    },
    600: {
      light: 'brown-caramel-sun-425-moon-901-active',
      dark: null,
    },
    700: {
      light: 'brown-caramel-sun-425-moon-901-hover',
      dark: null,
    },
    800: {
      light: 'brown-caramel-sun-425-moon-901',
      dark: null,
    },
    900: {
      light: null,
      dark: 'brown-caramel-925-125',
    },
    950: {
      light: null,
      dark: 'brown-caramel-975-75',
    },
  },
  brownOpera: {
    50: {
      light: 'brown-opera-975-75',
      dark: null,
    },
    100: {
      light: 'brown-opera-950-100',
      dark: null,
    },
    200: {
      light: 'brown-opera-925-125',
      dark: null,
    },
    300: {
      light: 'brown-opera-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'brown-opera-sun-395-moon-820',
    },
    500: {
      light: 'brown-opera-main-680',
      dark: 'brown-opera-main-680',
    },
    600: {
      light: 'brown-opera-sun-395-moon-820-active',
      dark: null,
    },
    700: {
      light: 'brown-opera-sun-395-moon-820-hover',
      dark: null,
    },
    800: {
      light: 'brown-opera-sun-395-moon-820',
      dark: null,
    },
    900: {
      light: null,
      dark: 'brown-opera-925-125',
    },
    950: {
      light: null,
      dark: 'brown-opera-975-75',
    },
  },
  beigeGrisGalet: {
    50: {
      light: 'beige-gris-galet-975-75',
      dark: null,
    },
    100: {
      light: 'beige-gris-galet-950-100',
      dark: null,
    },
    200: {
      light: 'beige-gris-galet-925-125',
      dark: null,
    },
    300: {
      light: 'beige-gris-galet-850-200',
      dark: null,
    },
    400: {
      light: null,
      dark: 'beige-gris-galet-sun-407-moon-821',
    },
    500: {
      light: 'beige-gris-galet-main-702',
      dark: 'beige-gris-galet-main-702',
    },
    600: {
      light: 'beige-gris-galet-sun-407-moon-821-active',
      dark: null,
    },
    700: {
      light: 'beige-gris-galet-sun-407-moon-821-hover',
      dark: null,
    },
    800: {
      light: 'beige-gris-galet-sun-407-moon-821',
      dark: null,
    },
    900: {
      light: null,
      dark: 'beige-gris-galet-925-125',
    },
    950: {
      light: null,
      dark: 'beige-gris-galet-975-75',
    },
  },
} as const;
