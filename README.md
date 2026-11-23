# primeuix-preset-dsfr

Preset de thème [primeuix](https://primeng.dev/theming/styled) qui reproduit l'apparence du
[Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/) pour PrimeNG,
PrimeVue et PrimeReact.

> Projet en cours de développement. Ce preset n'est pas le DSFR officiel. L'identité visuelle de
> l'État (police Marianne, bloc-marque) est réservée aux sites de l'État.

## Contenu du dépôt

| Projet | Chemin | Rôle |
|---|---|---|
| `preset-dsfr` | `packages/preset-dsfr` | Librairie publiable `primeuix-preset-dsfr` |
| `demo-ng` | `apps/demo-ng` | Démo Angular / PrimeNG |

Workspace Nx sans workspaces npm : les librairies sont résolues par alias `paths` dans
`tsconfig.base.json`.

## Démarrage

```sh
npm install
npm exec nx -- serve demo-ng
```

### Clé de licence PrimeUI

PrimeNG 22, PrimeVue 5 et PrimeReact 11 exigent une clé
[PrimeUI](https://primeui.dev/licenses). Copier
`apps/demo-ng/public/primeui-license.example.txt` vers `primeui-license.txt` dans le même dossier
et y coller la clé. Ce fichier est ignoré par git.

## Tâches

```sh
npm exec nx -- run-many -t lint test build
```

## Feuille de route

Voir [docs/ROADMAP.md](docs/ROADMAP.md).
