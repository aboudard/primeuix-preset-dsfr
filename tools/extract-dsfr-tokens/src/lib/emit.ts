const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

function key(name: string): string {
  return IDENTIFIER.test(name) || /^\d+$/.test(name)
    ? name
    : JSON.stringify(name);
}

/**
 * Sérialise une valeur en littéral TypeScript. `comments` associe un
 * commentaire de fin de ligne à certains chemins (ex. `blueFrance.800`).
 */
export function toLiteral(
  value: unknown,
  comments: Map<string, string> = new Map(),
  path = '',
  indent = '',
): string {
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
  if (value === null) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    const items = value.map(
      (item) => `${inner}${toLiteral(item, comments, path, inner)},`,
    );
    return `[\n${items.join('\n')}\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const lines = Object.entries(value).map(([k, v]) => {
      const childPath = path ? `${path}.${k}` : k;
      const comment = comments.get(childPath);
      return `${inner}${key(k)}: ${toLiteral(v, comments, childPath, inner)},${
        comment ? ` // ${comment}` : ''
      }`;
    });
    return `{\n${lines.join('\n')}\n${indent}}`;
  }
  throw new Error(`Valeur non sérialisable : ${String(value)}`);
}

export interface GeneratedFile {
  name: string;
  content: string;
}

export function header(version: string, sources: string[]): string {
  return [
    '/**',
    ' * Fichier généré par `nx run extract-dsfr-tokens:extract` : ne pas éditer à la main.',
    ` * Source : @gouvfr/dsfr ${version} (${sources.join(', ')}).`,
    ' */',
    '',
  ].join('\n');
}

/** Fichier exportant une constante `as const` (et éventuellement des types). */
export function constFile(
  head: string,
  doc: string,
  name: string,
  value: unknown,
  comments?: Map<string, string>,
  extra = '',
): string {
  return `${head}\n/** ${doc} */\nexport const ${name} = ${toLiteral(value, comments)} as const;\n${extra}`;
}
