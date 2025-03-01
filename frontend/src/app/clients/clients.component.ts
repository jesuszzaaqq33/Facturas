import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  name = '';
  email = '';
  cif = '';
  phone = null;
  address = '';
  API_URL = environment.apiUrl;
  clients: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {
    this.getClients(); // Llamar a la función al cargar el componente
  }
  registerClient() {
    const clientData = {
      name: this.name,
      email: this.email,
      cif: this.cif,
      phone: this.phone,
      address: this.address
    };

    this.http.post(`${this.API_URL}/api/clients`, clientData, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Client registered:', response);
        alert('Client registered successfully!');
        this.router.navigate(['/facturas']); // Redirect to invoices page
      },
      error: (error) => {
        console.error('Error registering client:', error);
        alert(error.error?.message || 'Error registering client');
      }
    });
  }
  goBack() {
    this.router.navigate(['/facturas']); // Go back to invoices page
  }
  getClients() {

    this.http.get<any[]>(`${this.API_URL}/api/clients`, { withCredentials: true }).subscribe({
      next: (clients) => {
        console.log(`${clients}`)
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }
}

