import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, // Esto asegura que sea un componente independiente
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}
  isLoginPage(): boolean {
    return this.router.url === '/login';  // Verifica si la URL es "/login"
  }
}
