import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Iniciar Sesión</h2>
    <form (ngSubmit)="login()">
      <label for="email">Correo:</label>
      <input id="email" [(ngModel)]="email" name="email" type="email" required>

      <label for="password">Contraseña:</label>
      <input id="password" [(ngModel)]="password" name="password" type="password" required>

      <button type="submit">Ingresar</button>
    </form>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@admin.com' && this.password === '1234') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/facturas']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
