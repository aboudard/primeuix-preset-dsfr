/**
 * Extraction des tokens du DSFR (`@gouvfr/dsfr`) vers des fichiers TypeScript
 * du preset primeuix. Lancer avec `nx run extract-dsfr-tokens:extract`.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  camelCase,
  collectColors,
  collectDecisions,
  groupByFamily,
} from './lib/colors.ts';
import { parseCss, readCustomProperties } from './lib/css.ts';
import { constFile, type GeneratedFile, header } from './lib/emit.ts';
import {
  extractEffects,
  extractRadius,
  extractSpacing,
  extractTypography,
} from './lib/foundations.ts';
import { buildScale, COLOR_SCALE, GREY_SCALE } from './lib/scale.ts';

const workspaceRoot = resolve(import.meta.dirname, '../../..');
const dsfrRoot = join(workspaceRoot, 'node_modules/@gouvfr/dsfr');
const outputDir = join(
  workspaceRoot,
  'packages/preset-dsfr/src/tokens/generated',
);

const read = (path: string) => readFileSync(join(dsfrRoot, path), 'utf8');
const version: string = JSON.parse(read('package.json')).version;

const core = parseCss(read('dist/core/core.css'));
const scheme = parseCss(read('dist/scheme/scheme.css'));
const full = parseCss(read('dist/dsfr.css'));

const lightVars = readCustomProperties(core, ':root');
const darkVars = readCustomProperties(scheme, ':root[data-fr-theme=dark]');
for (const [name, value] of readCustomProperties(
  core,
  ':root[data-fr-theme=dark]',
)) {
  if (!darkVars.has(name)) darkVars.set(name, value);
}

// Couleurs primitives, par famille.
const families = groupByFamily(collectColors(lightVars, darkVars));
const colors = Object.fromEntries(
  [...families].map(([family, list]) => [
    camelCase(family),
    Object.fromEntries(
      list.map((c) => [c.key, { light: c.light, dark: c.dark }]),
    ),
  ]),
);

// Échelles Prime 50 → 950 (0 → 950 pour les gris).
const scaleComments = new Map<string, string>();
const scaleVars: Record<string, Record<string, unknown>> = {};
const scales = Object.fromEntries(
  [...families].map(([family, list]) => {
    const name = camelCase(family);
    const entries = buildScale(
      list,
      family === 'grey' ? GREY_SCALE : COLOR_SCALE,
    );
    for (const entry of entries) {
      scaleComments.set(`${name}.${entry.step}`, entry.source);
    }
    scaleVars[name] = Object.fromEntries(
      entries.map((e) => [
        e.step,
        { light: e.vars.light ?? null, dark: e.vars.dark ?? null },
      ]),
    );
    return [name, Object.fromEntries(entries.map((e) => [e.step, e.value]))];
  }),
);

const decisions = Object.fromEntries(
  collectDecisions(lightVars, darkVars).map((d) => [
    d.name,
    { light: d.light, dark: d.dark },
  ]),
);

const head = (sources: string[]) => header(version, sources);
const coreSources = ['dist/core/core.css', 'dist/scheme/scheme.css'];

const files: GeneratedFile[] = [
  {
    name: 'meta.ts',
    content: `${head(['package.json'])}\n/** Version du DSFR dont les tokens sont extraits. */\nexport const DSFR_VERSION = '${version}';\n`,
  },
  {
    name: 'colors.ts',
    content: constFile(
      head(coreSources),
      'Couleurs primitives DSFR par famille. Clé = nom DSFR sans la famille (`sun-113-625` : niveau 113 en clair, 625 en sombre).',
      'dsfrColors',
      colors,
      undefined,
      '\nexport type DsfrColorFamily = keyof typeof dsfrColors;\n',
    ),
  },
  {
    name: 'scales.ts',
    content: constFile(
      head(coreSources),
      'Échelles Prime (50 → 950, 0 → 950 pour `grey`) construites depuis les niveaux DSFR. Voir docs/TOKENS.md.',
      'dsfrScales',
      scales,
      scaleComments,
      '\nexport type DsfrScaleFamily = keyof typeof dsfrScales;\n',
    ),
  },
  {
    name: 'scale-vars.ts',
    content: constFile(
      head(coreSources),
      'Pour chaque pas de `dsfrScales` : variable CSS DSFR (sans `--`) qui vaut exactement ce pas en thème clair (`light`) et en thème sombre (`dark`) ; `null` si aucune (pas interpolé ou niveau absent dans ce mode). Sert au mode « pont » du preset.',
      'dsfrScaleVars',
      scaleVars,
    ),
  },
  {
    name: 'decisions.ts',
    content: constFile(
      head(coreSources),
      'Tokens décisionnels DSFR (`--background-*`, `--text-*`, `--border-*`, `--artwork-*`) résolus en clair et en sombre.',
      'dsfrDecisions',
      decisions,
      undefined,
      '\nexport type DsfrDecisionToken = keyof typeof dsfrDecisions;\n',
    ),
  },
  {
    name: 'typography.ts',
    content: constFile(
      head(['dist/core/core.css']),
      'Typographie DSFR : familles, graisses, titres et textes (mobile / à partir de 48em).',
      'dsfrTypography',
      extractTypography(core),
    ),
  },
  {
    name: 'spacing.ts',
    content: constFile(
      head(['dist/core/core.css']),
      'Espacements DSFR (`v` = 0,25 rem, `w` = 0,5 rem).',
      'dsfrSpacing',
      extractSpacing(core),
    ),
  },
  {
    name: 'radius.ts',
    content: constFile(
      head(['dist/dsfr.css']),
      'Rayons de bordure DSFR.',
      'dsfrRadius',
      extractRadius(full),
    ),
  },
  {
    name: 'effects.ts',
    content: constFile(
      head(coreSources),
      'Anneau de focus et ombres DSFR.',
      'dsfrEffects',
      extractEffects(core, lightVars, darkVars),
    ),
  },
];

const modules = files.map((f) => f.name.replace(/\.ts$/, '')).sort();
files.push({
  name: 'index.ts',
  content: `${head(['tous les fichiers générés'])}\n${modules
    .map((m) => `export * from './${m}.js';`)
    .join('\n')}\n`,
});

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
for (const file of files) {
  writeFileSync(join(outputDir, file.name), file.content);
}

console.log(
  `DSFR ${version} : ${families.size} familles, ${Object.keys(decisions).length} tokens décisionnels → ${outputDir}`,
);
