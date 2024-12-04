import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private keycloakAuth: Keycloak;

  constructor() {
    this.keycloakAuth = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'dacs',
      clientId: 'dacs2023-fe',
    });
  }

  initKeycloak(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .then((authenticated) => {
          if (authenticated) {
            sessionStorage.setItem('jwt', this.keycloakAuth.token ?? 'nada')
            resolve(true);
          } else {
            reject('Not authenticated');
          }
        })
        .catch((error: Error) => reject(error));
    });
  }

  logout() {
    this.keycloakAuth.logout();
  }

  getToken() {
    return this.keycloakAuth.token;
  }

  
}
