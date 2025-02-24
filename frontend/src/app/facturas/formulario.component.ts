import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./formulario.component.html',
})
export class FormularioComponent {
  API_URL = environment.apiUrl
  cliente = '';
  clientes: any[] = [];
  monto: number | null = null;
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    this.uploadClients();
  }
  uploadClients() {
    this.http.get<any[]>(`${this.API_URL}/api/clientes`, { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.clientes = data;
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
        }
      });
  }
  crearFactura() {
    console.log('Factura creada:', { cliente: this.cliente, monto: this.monto });
    alert('Factura guardada con éxito');
  }
  newClient() {
    this.router.navigate(['/clients']); // Redirigir a la página de nuevo cliente
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
