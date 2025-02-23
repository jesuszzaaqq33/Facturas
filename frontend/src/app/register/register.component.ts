import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  API_URL = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {}

  register() {
    const userData = {
      username: this.username,
      password: this.password
    }
    this.http.post<{ message: string }>(`${this.API_URL}/api/auth/register`, userData)
    .subscribe(
      response => {
        console.log('✅ Registro exitoso:', response.message);
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('❌ Error en el registro:', error);
        alert(error.error?.error || 'Error en el registro');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
