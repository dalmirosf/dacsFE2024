import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";
import { Provider } from "@angular/core";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        initOptions: {
          onLoad: 'check-sso', 
          //checkLoginIframe: true, 
           silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
        },
        // Enables Bearer interceptor
        enableBearerInterceptor: true,
        // Prefix for the Bearer token
        bearerPrefix: 'Bearer',
        // URLs excluded from Bearer token addition (empty by default)
        //bearerExcludedUrls: []
      });


}

const firstLoginAttemptDone = localStorage.getItem('firstLoginAttemptDone');

 // Provider for Keycloak Bearer Interceptor
 export const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
 };

 // Provider for Keycloak Initialization
 export const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
 }