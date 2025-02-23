import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    console.log('Registrando usuario:', this.username, this.email, this.password);
    // Aquí deberías hacer una petición HTTP a tu backend para registrar al usuario.
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
