import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.estalogueado();

  // Permitir el acceso a la ruta de login incluso si está autenticado
  if (state.url === '/login') {
    return true;
  }

  // Redirige al login si no está autenticado
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true; // Acceso permitido a rutas protegidas si está autenticado
};