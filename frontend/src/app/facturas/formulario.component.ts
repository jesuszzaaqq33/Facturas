import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InvoiceService } from '../services/invoice.service';

export interface Factura {
  cantidad: number;
  descripcion: string;
  precio: number;
  total: number;
}
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule],
  templateUrl:'./formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent implements OnInit{
  API_URL = environment.apiUrl
  numeroFactura:string =''
  client:string = '';
  clients: any[] = [];
  displayedColumns: string[] = ['cantidad', 'descripcion', 'precio', 'total', 'acciones'];
  dataSource: Factura[] = [];
  constructor(private router: Router, private http: HttpClient, private invoiceService: InvoiceService) {}
  ngOnInit() {
    this.uploadClients();
  }
  uploadClients() {
    this.http.get<any[]>(`${this.API_URL}/api/clients`, { withCredentials: true })
    .subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }
  createInvoice() {
    const invoiceData = {
      client: this.client,
      items: this.dataSource
    };
    this.invoiceService.generateInvoice(invoiceData).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'factura.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  newClient() {
    this.router.navigate(['/clients']);
  }
  editClient() {
    // console.log("Usuario autenticado:", this.authService.isLoggedIn()); // Verificar autenticación
    this.router.navigate(['/edit-client']);
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
  agregarFila() {
    this.dataSource = [...this.dataSource, { cantidad: 1, descripcion: '', precio: 0, total: 0 }];
  }

  eliminarFila(index: number) {
    this.dataSource.splice(index, 1);
  }

  actualizarTotal(factura: Factura) {
    factura.total = factura.cantidad * factura.precio;
  }
  // trackByIndex(index: number, item: any): number {
  //   return index;
  // }

}
