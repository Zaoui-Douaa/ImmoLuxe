import { Component } from '@angular/core';
import {KeycloakService} from "./services/keycloak/keycloak.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImmoLuxe';
  constructor(private keycloakService: KeycloakService) {}

  onLogout() {
    this.keycloakService.logout();
  }
}
