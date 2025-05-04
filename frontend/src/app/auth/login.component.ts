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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = ''
  password = '';
  API_URL = environment.apiUrl
  constructor(private router: Router, private http: HttpClient) {}
  login() {
    this.http.post<{ token: string }>(`${this.API_URL}/api/auth/login`, {
      username: this.username,
      password: this.password
    }, { withCredentials: true })
    .subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/facturas']);
      },
      error: (error) => {
        console.error('Error del servidor:', error);
        alert(error.error?.message || 'Credenciales incorrectas');
      }
    });
  }
  register(){
    console.log('Redirigiendo a la página de registro...');
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
  logout() {
    this.http.post(`${this.API_URL}/api/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Sesión cerrada');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);
        }
      });
  }

}
