import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Esto asegura que sea un componente independiente
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:
  `
  <h1>Sistema de Facturación</h1>
  <router-outlet></router-outlet>
`
})
export class AppComponent {
  title = 'frontend';
}
