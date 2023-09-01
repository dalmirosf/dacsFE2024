import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url:  'http://localhost:8080' ,
          realm: 'dacs',
          clientId: 'dacs2023-fe',
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        }
      });
}