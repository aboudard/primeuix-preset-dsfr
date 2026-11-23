import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { PresetDsfr } from 'primeuix-preset-dsfr';
import { appRoutes } from './app.routes';

export const createAppConfig = (license?: string): ApplicationConfig => ({
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    providePrimeNG({
      license,
      theme: {
        preset: PresetDsfr,
        options: {
          darkModeSelector: '[data-fr-theme="dark"]',
          cssLayer: false,
        },
      },
    }),
  ],
});
