import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  API_URL = environment.apiUrl
  constructor(private http: HttpClient) {}

  generateInvoice(data: any) {
    return this.http.post(`${this.API_URL}/api/generate-invoice`, data, { responseType: 'blob' });
  }
}
