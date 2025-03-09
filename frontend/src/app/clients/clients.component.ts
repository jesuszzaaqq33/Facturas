import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../models/Client';

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
  postalCode: number | null = null
  API_URL = environment.apiUrl;
  clients: any[] = [];
  client: Client | null = null
  EditMode: boolean = false
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const state = history.state;
    if (state && state.client) {
      try {
        this.client = typeof state.client === 'string' ? JSON.parse(state.client) : state.client;
        this.EditMode = true;

        if (this.client) {
          this.name = this.client.name || '';
          this.email = this.client.email || '';
          this.cif = this.client.cif || '';
          this.phone = this.client.phone || null;
          this.address = this.client.address || '';
          this.postalCode = this.client.postalCode || null;
        }
      } catch (error) {
        console.error("Error al parsear el cliente:", error);
      }
    } else {
      this.EditMode = false;
    }
  }


  registerClient() {
    const clientData = {
      name: this.name,
      email: this.email,
      cif: this.cif,
      phone: this.phone,
      address: this.address,
      postalCode: this.postalCode
    };
    if (this.EditMode && this.client?._id) {
      this.http.put(`${this.API_URL}/api/clients/${this.client._id}`, clientData, { withCredentials: true }).subscribe({
        next: (response) => {
          // console.log('Cliente actualizado:', response);
          alert('Cliente actualizado correctamente!');
          this.router.navigate(['/edit-client']);
        },
        error: (error) => {
          console.error('Error actualizando cliente:', error);
          alert(error.error?.message || 'Error actualizando cliente');
        }
      });
    } else {
    this.http.post(`${this.API_URL}/api/clients`, clientData, { withCredentials: true }).subscribe({
      next: (response) => {
        // console.log('Client registered:', response);
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
    this.postalCode = client.postalCode
  }
  clearForm() {
    this.name = '';
    this.email = '';
    this.cif = '';
    this.phone = null;
    this.address = '';
    this.client = null;
    this.postalCode = null
  }
  goBack() {
    if (this.EditMode){
      this.router.navigate(['/edit-client']);
    }else {
      this.router.navigate(['/facturas']);
    }
  }
}

