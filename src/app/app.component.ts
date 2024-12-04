import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from './core/services/apiservice.service';
import { ITestResponse } from './core/models/response.interface';
import { FooterComponent } from './core/shared/footer/footer.component';
import { HeaderComponent } from './core/shared/header/header.component';
import { NavComponent } from './core/shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports: [FooterComponent, HeaderComponent, NavComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'dacs2023';
  public isLogueado = false;
  public testResponse : ITestResponse  | null = null;
  public apiPing = "";
  public apiConectorPing = "";
  public perfilUsuario: KeycloakProfile | null = null;
  public role = false;
  constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

  public async ngOnInit() {

    this.isLogueado = await this.keycloak.isLoggedIn();
    //this.role=await this.keycloak.isUserInRole("ROLE-A");
    this.apiService.getTest().subscribe(resp => {this.testResponse= resp});
    this.apiService.getPing().subscribe(resp => {this.apiPing= resp});
    this.apiService.getConectorPing().subscribe(resp => {this.apiConectorPing= resp});
    //console.log ("role=====>", this.role );

    if (!this.isLogueado) {
      this.iniciarSesion();
    } else {
      // Cargar perfil de usuario o realizar otras acciones post-login
      this.keycloak.loadUserProfile();
    }

  }

  public iniciarSesion() {
    this.keycloak.login();
  }

  public cerrarSesion() {
    this.keycloak.logout();
  }
}
