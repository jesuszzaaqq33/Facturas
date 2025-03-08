import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const API_URL = environment.apiUrl;
  return http.get<{ authenticated: boolean }>(`${API_URL}/api/auth/check-auth`, { withCredentials: true }).pipe(
    map(response => {
      console.log('Respuesta del servidor:', response);

      if (response.authenticated) {
        return true; // ✅ Usuario autenticado, permite acceso
      } else {
        console.warn('Usuario no autenticado. Redirigiendo al login.');

        router.navigate(['/login']); // ❌ No autenticado, redirige al login
        return false;
      }
    }),
    catchError((error) => {
      console.error('Error en la autenticación:', error);

      router.navigate(['/login']); // ❌ Si hay error, redirige al login
      return of(false);
    })
  );
};
