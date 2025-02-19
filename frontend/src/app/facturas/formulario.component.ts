import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Crear Factura Electrónica</h2>
    <form (ngSubmit)="crearFactura()">
      <label for="cliente">Cliente:</label>
      <input id="cliente" [(ngModel)]="cliente" name="cliente" required>

      <label for="monto">Monto:</label>
      <input id="monto" [(ngModel)]="monto" name="monto" type="number" required>

      <button type="submit">Guardar Factura</button>
    </form>
  `,
})
export class FormularioComponent {
  cliente = '';
  monto: number | null = null;

  crearFactura() {
    console.log('Factura creada:', { cliente: this.cliente, monto: this.monto });
    alert('Factura guardada con éxito');
  }
}
