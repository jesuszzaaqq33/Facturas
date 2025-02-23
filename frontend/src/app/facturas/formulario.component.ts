import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./formulario.component.html',
})
export class FormularioComponent {
  cliente = '';
  monto: number | null = null;

  crearFactura() {
    console.log('Factura creada:', { cliente: this.cliente, monto: this.monto });
    alert('Factura guardada con éxito');
  }
}
