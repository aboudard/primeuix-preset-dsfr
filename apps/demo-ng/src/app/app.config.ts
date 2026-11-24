import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { createPresetDsfr } from 'primeuix-preset-dsfr';
import { appRoutes } from './app.routes';

export interface DemoOptions {
  /** Clé de licence PrimeUI (lue dans public/primeui-license.txt). */
  license?: string;
  /**
   * Mode « pont » : `dsfr.css` est chargé dans la couche `dsfr` et le preset
   * renvoie vers ses variables CSS (URL `?bridge`).
   */
  bridge?: boolean;
}

export const createAppConfig = ({
  license,
  bridge = false,
}: DemoOptions = {}): ApplicationConfig => ({
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    providePrimeNG({
      license,
      theme: {
        preset: createPresetDsfr({ bridge }),
        options: {
          darkModeSelector: '[data-fr-theme="dark"]',
          // Avec dsfr.css : DSFR sous Prime, styles de l'application (non
          // layered) au-dessus de tout. Sans dsfr.css : pas de couche.
          cssLayer: bridge
            ? { name: 'primeng', order: 'dsfr, primeng' }
            : false,
        },
      },
    }),
  ],
});
