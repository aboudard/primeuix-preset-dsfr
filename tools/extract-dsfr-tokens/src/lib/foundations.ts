import type { Root } from 'postcss';
import { readRuleDeclarations, resolveVars } from './css.ts';

/** Point de rupture « md » du DSFR, à partir duquel les titres grandissent. */
export const DESKTOP_MEDIA = '(min-width: 48em)';

export interface FontSize {
  fontSize: string;
  lineHeight: string;
}

export interface ResponsiveFontSize {
  mobile: FontSize;
  desktop: FontSize;
}

export interface Typography {
  fontFamily: { base: string; alt: string };
  fontWeight: Record<string, number>;
  body: FontSize;
  heading: Record<string, ResponsiveFontSize>;
  display: Record<string, ResponsiveFontSize>;
  text: Record<string, FontSize>;
}

function required(
  decls: Map<string, string> | undefined,
  prop: string,
  where: string,
): string {
  const value = decls?.get(prop);
  if (value === undefined) throw new Error(`${prop} absent de ${where}`);
  return value;
}

function fontSize(decls: Map<string, string> | undefined, where: string) {
  return {
    fontSize: required(decls, 'font-size', where),
    lineHeight: required(decls, 'line-height', where),
  };
}

/** Typographie : familles, graisses et échelles `.fr-h*`, `.fr-display--*`, `.fr-text--*`. */
export function extractTypography(root: Root): Typography {
  const rules = readRuleDeclarations(root, (s) =>
    /^(body|\.fr-h[1-6]|\.fr-display--\w+|\.fr-text--\w+)$/.test(s),
  );
  const top = (selector: string) => rules.get(selector)?.get('top');
  const responsive = (selector: string): ResponsiveFontSize => {
    const mobile = fontSize(top(selector), selector);
    const desktopDecls = rules.get(selector)?.get(DESKTOP_MEDIA);
    return {
      mobile,
      desktop: desktopDecls ? fontSize(desktopDecls, selector) : mobile,
    };
  };

  const weights = ['light', 'regular', 'bold', 'heavy'];
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  return {
    fontFamily: {
      base: required(top('body'), 'font-family', 'body'),
      alt: required(top('.fr-text--alt'), 'font-family', '.fr-text--alt'),
    },
    fontWeight: Object.fromEntries(
      weights.map((w) => [
        w,
        Number(required(top(`.fr-text--${w}`), 'font-weight', w)),
      ]),
    ),
    body: fontSize(top('body'), 'body'),
    heading: Object.fromEntries(
      [1, 2, 3, 4, 5, 6].map((n) => [`h${n}`, responsive(`.fr-h${n}`)]),
    ),
    display: Object.fromEntries(
      sizes.map((s) => [s, responsive(`.fr-display--${s}`)]),
    ),
    text: Object.fromEntries(
      [...sizes, 'lead'].map((s) => [s, fontSize(top(`.fr-text--${s}`), s)]),
    ),
  };
}

const SPACING_CLASS = /^\.fr-m-(\d+(?:-5)?[vw]|0)$/;

/**
 * Espacements DSFR, lus sur les utilitaires `.fr-m-*` : unité `v` = 0,25 rem
 * (base 4 px), `w` = 0,5 rem (base 8 px). Triés par valeur croissante.
 */
export function extractSpacing(root: Root): Record<string, string> {
  const rules = readRuleDeclarations(root, (s) => SPACING_CLASS.test(s));
  const entries = [...rules.entries()].map(([selector, contexts]) => {
    const name = selector.match(SPACING_CLASS)?.[1] as string;
    return [name, required(contexts.get('top'), 'margin', selector)] as const;
  });
  const rem = (v: string) => (v === '0' ? 0 : parseFloat(v));
  entries.sort(([a, va], [b, vb]) => rem(va) - rem(vb) || a.localeCompare(b));
  return Object.fromEntries(entries);
}

export interface Radius {
  none: string;
  /** Champs de formulaire (`.fr-input`, `.fr-select`) : coins hauts arrondis. */
  field: string;
  /** Rayons uniformes utilisés par les composants DSFR, croissants. */
  scale: string[];
}

/** Rayons de bordure, lus sur la feuille complète `dsfr.css`. */
export function extractRadius(root: Root): Radius {
  const rules = readRuleDeclarations(
    root,
    (s) => s === '.fr-input' || s === '.fr-select',
  );
  const input = required(
    rules.get('.fr-input')?.get('top'),
    'border-radius',
    '.fr-input',
  );
  const select = required(
    rules.get('.fr-select')?.get('top'),
    'border-radius',
    '.fr-select',
  );
  if (input !== select) {
    throw new Error(`Rayons de champ divergents : ${input} / ${select}`);
  }
  const uniform = new Set<string>();
  root.walkDecls('border-radius', (decl) => {
    if (/^\d*\.?\d+rem$/.test(decl.value)) uniform.add(decl.value);
  });
  return {
    none: '0',
    field: input,
    scale: [...uniform].sort((a, b) => parseFloat(a) - parseFloat(b)),
  };
}

export interface Effects {
  focusRing: { width: string; style: string; color: string; offset: string };
  shadow: Record<string, { light: string; dark: string }>;
}

/** Anneau de focus (règle `a:focus`…) et ombres portées, clair / sombre. */
export function extractEffects(
  root: Root,
  lightVars: Map<string, string>,
  darkVars: Map<string, string>,
): Effects {
  const focus = readRuleDeclarations(root, (s) => s === 'a:focus')
    .get('a:focus')
    ?.get('top');
  const darkScope = new Map([...lightVars, ...darkVars]);
  const shadow = Object.fromEntries(
    ['raised', 'overlap', 'lifted'].map((name) => {
      const value = lightVars.get(`${name}-shadow`);
      if (!value) throw new Error(`--${name}-shadow absent`);
      return [
        name,
        {
          light: resolveVars(value, lightVars),
          dark: resolveVars(value, darkScope),
        },
      ];
    }),
  );
  return {
    focusRing: {
      width: required(focus, 'outline-width', 'a:focus'),
      style: required(focus, 'outline-style', 'a:focus'),
      color: required(focus, 'outline-color', 'a:focus'),
      offset: required(focus, 'outline-offset', 'a:focus'),
    },
    shadow,
  };
}
