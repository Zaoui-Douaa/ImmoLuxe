import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  if (keycloakService.keycloak?.isTokenExpired()) {
    keycloakService.login();
    return false;
  }
  return true;
};
