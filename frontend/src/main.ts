import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
}).catch((err) => console.error(err));
