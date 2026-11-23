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

loadLicense()
  .then((license) => bootstrapApplication(App, createAppConfig(license)))
  .catch((err) => console.error(err));
