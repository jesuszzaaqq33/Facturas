import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-client',
  standalone: true,
  templateUrl: './edit-client.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  API_URL = environment.apiUrl
  client = '';
  clients: any[] = [];
  displayedColumns: string[] = ['cantidad', 'descripcion', 'precio', 'total', 'acciones'];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    this.uploadClients();
  }
  uploadClients() {
    this.http.get<any[]>(`${this.API_URL}/api/clients`, { withCredentials: true })
    .subscribe({
      next: (clients) => {
        console.log(clients)
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }
  editClient(){
    console.log("hola")
  }
  deleteClient(clientId: string){
    console.log("delete")
    console.log("Eliminando cliente con ID:", clientId);

    this.http.delete<{ message: string }>(`${this.API_URL}/api/clients/${clientId}`, { withCredentials: true })
    .subscribe({
      next: (response) => {
        console.log('Cliente eliminado correctamente:', response.message);
        alert(response.message); // Muestra una alerta con el mensaje del servidor
        this.router.navigate(['/facturas']); // Redirige después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar cliente:', error);
        alert(error.error?.message || 'No se pudo eliminar el cliente.');
      }
    });

  }
  goBack() {
    this.router.navigate(['/facturas']); // Go back to invoices page
  }
}
