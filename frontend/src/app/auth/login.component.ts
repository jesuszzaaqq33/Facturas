import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  // login() {
  //   if (this.email === 'admin@admin.com' && this.password === '1234') {
  //     localStorage.setItem('auth', 'true');
  //     this.router.navigate(['/facturas']);
  //   } else {
  //     alert('Credenciales incorrectas');
  //   }
  // }
  login() {
    this.http.post<{ token: string }>('http://localhost:5000/login', {
      email: this.email,
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
