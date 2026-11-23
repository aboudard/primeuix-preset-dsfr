# Feuille de route – preset primeuix DSFR

Ce document est **autoporteur** : chaque phase peut être confiée à une session Claude
indépendante. Pour lancer une phase, ouvrir une session dans ce dépôt avec un prompt du type :

> Lis `docs/ROADMAP.md` (sections « Contexte » et « Conventions ») puis réalise la **phase N**.
> Respecte les critères de fin de phase et mets à jour la section « Suivi » en fin de travail.

---

## Contexte

**Objectif** : un preset de thème [primeuix](https://primeng.dev/theming/styled) qui reproduit au
plus près le [Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants),
utilisable par PrimeNG, PrimeVue et PrimeReact (les trois consomment `@primeuix/themes`).

### Décisions prises

| Sujet | Décision | Raison |
|---|---|---|
| Mode de thème | **Styled** (preset de design tokens) + CSS d'appoint via la clé `css` du preset | Un seul paquet commun aux 3 librairies ; le mode unstyled imposerait de réécrire le CSS de 80+ composants et des `pt` spécifiques à chaque framework |
| Unstyled / pass-through | Exception ponctuelle, documentée composant par composant | Seulement quand le DOM Prime ne permet pas d'approcher le DSFR |
| Preset de base | **Nora** (`@primeuix/themes/nora`) | Plus anguleux et sobre qu'Aura, plus proche du DSFR (à reconfirmer en phase 3) |
| Mode sombre | `darkModeSelector: '[data-fr-theme="dark"]'` | Compatible avec le sélecteur de thème du DSFR |
| Police | Marianne **non embarquée** ; pile `Marianne, arial, sans-serif` | Marque de l'État : la police est fournie par l'application consommatrice |
| Paquet npm | `primeuix-preset-dsfr` (ESM, `@primeuix/themes` en peerDependency) | |
| Démo de départ | Angular / PrimeNG (`apps/demo-ng`) ; Vue et React plus tard | |

### Points d'attention

- **Licence PrimeUI** : PrimeNG 22, PrimeVue 5, PrimeReact 11 et `@primeuix/themes` sont sous
  *PrimeUI License* (plus MIT). Une clé est requise, sinon un bandeau « Invalid PrimeUI License »
  s'affiche. La clé locale est lue depuis `apps/demo-ng/public/primeui-license.txt`
  (**ignoré par git, ne jamais commiter ni afficher la clé**). Modèle : `primeui-license.example.txt`.
  La clé actuelle est de type *Community* (réservée aux petites structures) : un usage
  professionnel demandera une licence commerciale.
- **Marque de l'État** : le DSFR (Marianne, bloc-marque, identité visuelle) est réservé aux sites
  de l'État. Le preset ne doit pas se présenter comme « DSFR officiel » ; le documenter.
- **Alternatives existantes** : VueDsfr, `@edugouvfr/ngx-dsfr`, `@codegouvfr/react-dsfr`. La valeur
  du preset : garder les composants riches de Prime (DataTable, DatePicker, TreeSelect…) avec
  l'apparence DSFR.

### Versions (au 2026-11-23)

Nx 24.0.6 · Angular 22.2 · PrimeNG 22.1 · `@primeuix/themes` 3.1 · `@gouvfr/dsfr` 1.15 ·
TypeScript 6.0 · Node 24 · npm 11.

---

## Conventions du workspace

- Workspace Nx créé avec `--preset=ts --no-workspaces` : **pas de workspaces npm, pas de
  `composite`**. Les librairies sont résolues par alias `paths` dans `tsconfig.base.json`
  (`primeuix-preset-dsfr` → `packages/preset-dsfr/src/index.ts`).
- Lancer les tâches via Nx, préfixées par npm : `npm exec nx -- run-many -t lint test build`.
  En session Claude Code, préfixer par `CLAUDECODE=` si une commande Nx bascule en mode
  « agent » non désiré (ex. `create-nx-workspace` ignorait `--workspaces=false`).
- Tags de projet : `type:app` (applications), `type:shared` (librairies).
- `@gouvfr/dsfr` est installé en devDependency **avec `--ignore-scripts`** (son postinstall exige
  un projet DSFR initialisé). Il sert uniquement de **source de tokens**, jamais au runtime.
- Démo : `npm exec nx -- serve demo-ng` → http://localhost:4200.
- Langue : documentation et commentaires en français ; noms de code en anglais.

### Arborescence

```
apps/demo-ng/                     # démo PrimeNG (Angular 22, zoneless, vitest)
  public/primeui-license.txt      # clé locale (ignorée)
  src/main.ts                     # lit la clé puis bootstrap
  src/app/app.config.ts           # createAppConfig(license) + providePrimeNG
packages/preset-dsfr/             # librairie publiable primeuix-preset-dsfr
  src/lib/preset-dsfr.ts          # PresetDsfr = definePreset(Nora, {...})
docs/ROADMAP.md                   # ce fichier
```

Arborescence cible du preset (à construire au fil des phases) :

```
packages/preset-dsfr/src/
  tokens/generated/   # sortie du script d'extraction (phase 1) – ne pas éditer à la main
  primitive.ts        # palettes DSFR, rayons, typo, espacements
  semantic.ts         # primary, surface, formField, focusRing, colorScheme light/dark
  components/*.ts     # surcharges de tokens par composant
  css/*.ts            # CSS d'appoint injecté via la clé `css`
  index.ts            # export PresetDsfr
tools/extract-dsfr-tokens/  # script d'extraction (phase 1)
```

### Note technique

`definePreset(Nora, …)` type les primitives selon Nora : déclarer de nouvelles familles
(`blueFrance`…) impose `definePreset(Nora as Preset, …)`.

---

## Phases

### Phase 0 – Initialisation ✅

Workspace Nx, démo PrimeNG, preset minimal (bleu France, rayons, anneau de focus DSFR), gestion de
la clé PrimeUI, dépôt GitHub. Lint / test / build verts.

### Phase 1 – Extraction des tokens DSFR

**But** : générer automatiquement les primitives du preset depuis `@gouvfr/dsfr`, pour ne plus
saisir de valeurs à la main et suivre les montées de version du DSFR.

**Entrées** : `node_modules/@gouvfr/dsfr/dist/core/core.css` (variables CSS `:root` et
`:root[data-fr-theme=dark]`), documentation DSFR « Fondamentaux » (couleurs, typographie,
espacements).

**Travail** :
1. Créer un projet Nx `tools/extract-dsfr-tokens` (script Node/TS) avec une cible
   `nx run extract-dsfr-tokens:extract`.
2. Parser les variables CSS du DSFR (bibliothèque `postcss` recommandée) :
   - **couleurs primitives** : familles `blue-france`, `red-marianne`, `grey`, couleurs système
     (`info`, `success`, `warning`, `error`) et illustratives (`green-tilleul-verveine`,
     `purple-glycine`…), avec leurs niveaux (`975`, `950`, `925`, `850`, `sun-113`, `main-525`,
     `moon-…`, variantes `-hover` / `-active`) ;
   - **tokens décisionnels** (`--background-action-high-blue-france`, `--text-default-grey`,
     `--border-default-grey`…) en **clair et sombre** ;
   - typographie (familles, tailles, interlignages), espacements (base 4 px, `v`/`w`), rayons.
3. Générer `packages/preset-dsfr/src/tokens/generated/*.ts` (fichiers typés, en-tête
   « généré, ne pas éditer », version du DSFR source).
4. Construire une **échelle Prime 50→950** par famille à partir des niveaux DSFR : documenter la
   table de correspondance (ex. `800` = `sun-113-625`, `700` = son hover, `600` = son active).
5. Remplacer la palette provisoire `blueFrance` de `preset-dsfr.ts` par les tokens générés.
6. Tests unitaires : valeurs clés (`#000091`, `#e1000f`, `#0a76f6`…) et présence clair/sombre.

**Fin de phase** : la cible `extract` est reproductible, les fichiers générés sont commités, le
preset compile et la démo est inchangée visuellement (ou améliorée), lint/test/build verts.

### Phase 2 – Architecture du preset

**But** : découper le preset selon l'arborescence cible et préparer l'extensibilité.

**Travail** :
1. Scinder `preset-dsfr.ts` en `primitive.ts`, `semantic.ts`, `components/`, `css/`.
2. Exposer une option « pont » : `createPresetDsfr({ bridge: true })` où les primitives renvoient
   vers les variables CSS du DSFR (`var(--blue-france-sun-113-625)`) quand `dsfr.css` est déjà
   chargé par l'application.
3. Évaluer `cssLayer` (ordre `primeng` / `dsfr` / app) et documenter la recommandation.
4. Configurer le build publiable (ESM + `.d.ts`, `exports` propres, `sideEffects: false`) et
   vérifier avec `npm pack --dry-run` sur `dist/packages/preset-dsfr`.

**Fin de phase** : API publique documentée dans `packages/preset-dsfr/README.md`, build publiable
vérifié.

### Phase 3 – Tokens sémantiques et globaux

**But** : que tout composant Prime « non retouché » ait déjà l'air DSFR.

**Travail** :
- `primary` : bleu France (repos `#000091`, hover `#1212ff`, actif `#2323ff`) ; équivalent sombre.
- `surface` : gris DSFR (clair et sombre).
- `focusRing` : `2px solid #0a76f6`, offset `2px` (signature RGAA du DSFR).
- `borderRadius` : `0` par défaut ; `0.25rem 0.25rem 0 0` pour les champs.
- `formField` : fond `#eeeeee` (`grey-950`), texte `#3a3a3a` ; la bordure basse DSFR
  (`box-shadow: inset 0 -2px 0 0 #3a3a3a`) passe par du CSS d'appoint (phase 4).
- Typographie : `Marianne, arial, sans-serif`, échelle de tailles DSFR.
- Confirmer Nora vs Aura comme base (comparer visuellement 10 composants).

**Fin de phase** : captures avant/après des composants courants dans la démo, mode sombre vérifié.

### Phase 4 – Composants (par lots)

**Lot 1** (formulaires et navigation, prioritaire) : Button, InputText, Textarea, Select,
Checkbox, RadioButton, ToggleSwitch, Tag, Badge, Tabs, Accordion, Breadcrumb, Paginator,
Message, Dialog, Tooltip, Stepper, DataTable, FileUpload.

**Lot 2** (composants Prime sans équivalent DSFR, à habiller « dans l'esprit ») : DatePicker,
MultiSelect, AutoComplete, Tree, TreeSelect, Menu, Menubar, Toast, Splitter, Drawer…

**Hors périmètre** (laisser aux librairies DSFR natives) : en-tête, pied de page, tuile, carte,
mise en avant, bandeau de consentement.

**Pour chaque composant** :
1. Surcharger les design tokens dans `components/<nom>.ts`.
2. Ajouter le CSS d'appoint nécessaire dans `css/<nom>.ts` (clé `css` du preset).
3. Ajouter une section dans la démo, à côté du rendu DSFR de référence (capture ou HTML DSFR).
4. Consigner les écarts dans `docs/ECARTS.md` : fidèle / approché / impossible, avec la raison.

**Cas connus nécessitant du CSS** : bordure basse des champs et états erreur/succès (barre
latérale du groupe), variantes de boutons (primaire, secondaire, tertiaire, tertiaire sans
bordure, icône gauche/droite), case à cocher et radio, onglets style « dossier », Message avec
bandeau d'icône. Icônes : le DSFR utilise Remix Icon, Prime utilise PrimeIcons ; documenter la
correspondance ou fournir un adaptateur.

**Fin de lot** : tous les composants du lot présents dans la démo, `docs/ECARTS.md` à jour,
lint/test/build verts.

### Phase 5 – Validation (en continu à partir de la phase 4)

- Tests visuels **Playwright** (`apps/demo-ng-e2e`) : captures par composant, clair et sombre,
  comparées à des références DSFR, avec seuil de tolérance.
- Accessibilité : `@axe-core/playwright` sur chaque page de démo ; contrastes RGAA ; focus visible.
- CI GitHub Actions : `nx affected -t lint test build e2e`. La clé PrimeUI de CI doit être un
  **secret GitHub** écrit dans `primeui-license.txt` pendant le job, jamais commitée.

### Phase 6 – Démos Vue et React

- `apps/demo-vue` (Vue 3 + Vite + PrimeVue 5) et `apps/demo-react` (React + Vite + PrimeReact 11)
  via `@nx/vue` et `@nx/react`, consommant le même preset par l'alias `paths`.
- Même page de démonstration que `demo-ng`, même mécanisme de clé de licence.
- Vérifier que les noms de tokens des composants sont identiques dans les trois librairies ;
  documenter les différences.

### Phase 7 – Packaging et documentation

- Publication avec `nx release` (versionnage, changelog). Aligner les notes de version sur la
  version du DSFR source.
- README du paquet : installation, intégration PrimeNG / PrimeVue / PrimeReact, mode sombre,
  police Marianne, avertissements licence PrimeUI et marque de l'État.
- Démo publiée (GitHub Pages) **sans** clé de licence commerciale exposée : à arbitrer.

---

## Suivi

| Phase | Statut | Date | Notes |
|---|---|---|---|
| 0 – Initialisation | ✅ Terminée | 2026-11-23 | |
| 1 – Extraction des tokens | À faire | | |
| 2 – Architecture | À faire | | |
| 3 – Tokens sémantiques | À faire | | |
| 4 – Composants lot 1 | À faire | | |
| 4 – Composants lot 2 | À faire | | |
| 5 – Validation | À faire | | |
| 6 – Démos Vue / React | À faire | | |
| 7 – Packaging | À faire | | |
