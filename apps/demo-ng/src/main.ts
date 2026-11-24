import { bootstrapApplication } from '@angular/platform-browser';
import { createAppConfig } from './app/app.config';
import { App } from './app/app';

/**
 * La clé PrimeUI est lue au démarrage depuis public/primeui-license.txt
 * (fichier ignoré par git). Sans ce fichier, PrimeNG affiche son bandeau de licence.
 */
async function loadLicense(): Promise<string | undefined> {
  try {
    const res = await fetch('primeui-license.txt', { cache: 'no-store' });
    if (!res.ok) return undefined;
    const key = (await res.text()).trim();
    // Fichier absent : le serveur renvoie index.html (fallback SPA).
    return key && !key.startsWith('<') ? key : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Mode « pont » (`?bridge`) : charge le CSS du DSFR (copié depuis
 * @gouvfr/dsfr dans dsfr/) dans la couche `dsfr`, sous celle de Prime.
 */
function loadDsfrCss(): void {
  const style = document.createElement('style');
  style.textContent = [
    "@import url('dsfr/core/core.min.css') layer(dsfr);",
    "@import url('dsfr/scheme/scheme.min.css') layer(dsfr);",
  ].join('\n');
  document.head.prepend(style);
}

const bridge = new URLSearchParams(location.search).has('bridge');
if (bridge) loadDsfrCss();

loadLicense()
  .then((license) =>
    bootstrapApplication(App, createAppConfig({ license, bridge })),
  )
  .catch((err) => console.error(err));
