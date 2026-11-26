/**
 * CSS d'appoint injecté par la clé `css` du preset, pour ce que les design
 * tokens ne permettent pas d'atteindre (bordure basse des champs DSFR…).
 * Chaque composant ajoutera son fichier `css/<nom>.ts` (phase 4).
 */
const parts: string[] = [];

export const css = parts.join('\n');
