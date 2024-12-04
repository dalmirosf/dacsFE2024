import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakBearerInterceptorProvider, KeycloakInitializerProvider } from './core/init/keycloak-init.factory';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import { initializeKeycloak } from './core/init/keycloak-init.factory';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    KeycloakService, // Proveedor para KeycloakService
    KeycloakBearerInterceptorProvider,
    KeycloakInitializerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService], // Dependencia necesaria para inicializar Keycloak
    },
  ],
};
