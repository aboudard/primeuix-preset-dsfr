import postcss, { type AtRule, type Root, type Rule } from 'postcss';

/** Analyse une feuille de style CSS. */
export function parseCss(css: string): Root {
  return postcss.parse(css);
}

/** Supprime le suffixe `!important` d'une valeur de déclaration. */
function cleanValue(value: string): string {
  return value.replace(/\s*!important\s*$/, '').trim();
}

/** Indique si une règle est au premier niveau (hors `@media`, `@supports`…). */
function isTopLevel(rule: Rule): boolean {
  return rule.parent?.type === 'root';
}

/**
 * Variables CSS (`--x: …`) déclarées par les règles de premier niveau dont le
 * sélecteur est exactement `selector` (ex. `:root`, `:root[data-fr-theme=dark]`).
 */
export function readCustomProperties(
  root: Root,
  selector: string,
): Map<string, string> {
  const vars = new Map<string, string>();
  root.walkRules((rule) => {
    if (!isTopLevel(rule) || rule.selector !== selector) return;
    rule.walkDecls((decl) => {
      if (decl.prop.startsWith('--')) {
        vars.set(decl.prop.slice(2), cleanValue(decl.value));
      }
    });
  });
  return vars;
}

/** Contexte d'une règle : premier niveau, ou paramètres du `@media` parent. */
export type RuleContext = 'top' | string;

/**
 * Déclarations des règles dont l'un des sélecteurs (liste séparée par des
 * virgules) satisfait `match`. Le résultat est indexé par sélecteur, puis par
 * contexte (`top` ou paramètres `@media`), puis par propriété.
 */
export function readRuleDeclarations(
  root: Root,
  match: (selector: string) => boolean,
): Map<string, Map<RuleContext, Map<string, string>>> {
  const result = new Map<string, Map<RuleContext, Map<string, string>>>();
  root.walkRules((rule) => {
    const parent = rule.parent;
    let context: RuleContext;
    if (parent?.type === 'root') {
      context = 'top';
    } else if (
      parent?.type === 'atrule' &&
      (parent as AtRule).name === 'media' &&
      parent.parent?.type === 'root'
    ) {
      context = (parent as AtRule).params;
    } else {
      return;
    }
    for (const selector of rule.selectors.map((s) => s.trim())) {
      if (!match(selector)) continue;
      const bySelector = result.get(selector) ?? new Map();
      result.set(selector, bySelector);
      const decls: Map<string, string> = bySelector.get(context) ?? new Map();
      bySelector.set(context, decls);
      rule.each((node) => {
        if (node.type === 'decl') decls.set(node.prop, cleanValue(node.value));
      });
    }
  });
  return result;
}

const VAR_REFERENCE = /var\(--([a-z0-9-]+)\)/g;

/**
 * Remplace récursivement les `var(--x)` d'une valeur par la valeur de `x`
 * dans `vars`. Les références inconnues sont laissées telles quelles.
 */
export function resolveVars(
  value: string,
  vars: Map<string, string>,
  depth = 0,
): string {
  if (depth > 20) {
    throw new Error(`Référence circulaire probable dans « ${value} »`);
  }
  if (!value.includes('var(')) return value;
  const resolved = value.replace(VAR_REFERENCE, (whole, name: string) => {
    const target = vars.get(name);
    return target === undefined ? whole : target;
  });
  return resolved === value ? value : resolveVars(resolved, vars, depth + 1);
}
