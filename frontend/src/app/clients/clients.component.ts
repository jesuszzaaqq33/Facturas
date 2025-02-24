import { Component } from '@angular/core';
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
export class ClientsComponent {
  name = '';
  email = '';
  API_URL = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {}

  registerClient() {
    const clientData = { name: this.name, email: this.email };

    this.http.post(`${this.API_URL}/api/clients`, clientData).subscribe({
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
}

