import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = ''
  password = '';
  API_URL = environment.apiUrl
  constructor(private router: Router, private http: HttpClient) {}

  // login() {
  //   if (this.email === 'admin@admin.com' && this.password === '1234') {
  //     localStorage.setItem('auth', 'true');
  //     this.router.navigate(['/facturas']);
  //   } else {
  //     alert('Credenciales incorrectas');
  //   }
  // }this.http.post<{ message: string }>(`${this.API_URL}/api/auth/register`, userData)
  login() {
    this.http.post<{ token: string }>(`${this.API_URL}/api/auth/login`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // ✅ Ver qué devuelve el backend
        localStorage.setItem('token', response.token);
        this.router.navigate(['/facturas']);
      },
      error: (error) => {
        console.error('Error del servidor:', error); // ✅ Imprimir error detallado
        alert(error.error?.message || 'Credenciales incorrectas');
      }
    });
  }
  register(){
    console.log('Redirigiendo a la página de registro...');
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
