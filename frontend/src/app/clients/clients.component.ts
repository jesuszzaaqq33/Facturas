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
export class ClientsComponent implements OnInit  {
  name = '';
  email = '';
  cif = '';
  phone: number | null = null;
  address = '';
  API_URL = environment.apiUrl;
  clients: any[] = [];
  client: string | null = null
  EditMode: boolean = false
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const state = history.state;
    if (state && state.client) {
      this.client = state.client;
      this.EditMode = true
      console.log("Client ID:", this.client);
      this.editClient(this.client)
    }
  }

  registerClient() {
    const clientData = {
      name: this.name,
      email: this.email,
      cif: this.cif,
      phone: this.phone,
      address: this.address
    };
    if (this.EditMode) {
      // Modo edición (PUT)
      this.http.put(`${this.API_URL}/api/clients/${this.client}`, clientData, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Cliente actualizado:', response);
          alert('Cliente actualizado correctamente!');
          this.clearForm();
        },
        error: (error) => {
          console.error('Error actualizando cliente:', error);
          alert(error.error?.message || 'Error actualizando cliente');
        }
      });
    } else {
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
  }
  editClient(client: any) {
    // this.client = client._id;
    this.name = client.name;
    this.email = client.email;
    this.cif = client.cif;
    this.phone = client.phone;
    this.address = client.address;
  }
  clearForm() {
    this.name = '';
    this.email = '';
    this.cif = '';
    this.phone = null;
    this.address = '';
    this.client = null; // Salimos del modo edición
  }
  goBack() {
    if (this.EditMode){
      this.router.navigate(['/edit-client']);
    }else {
      this.router.navigate(['/facturas']);
    }
  }
}

