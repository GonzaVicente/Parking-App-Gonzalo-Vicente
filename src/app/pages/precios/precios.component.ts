import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../components/header/header.component';

interface Tarifa {
  tipo: string;
  valor: number;
}

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule, HeaderComponent], 
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent {
  tarifas: Tarifa[] = [
    { tipo: 'Media hora', valor: 130 },
    { tipo: 'Primera hora', valor: 130 },
    { tipo: 'Hora adicional', valor: 80 }
  ];
reportes: any;

  // Aquí puedes agregar funciones para editar o modificar las tarifas si es necesario
  editarTarifa(tarifa: Tarifa) {
    Swal.fire({
      title: `Editar tarifa para ${tarifa.tipo}`,
      input: 'number',
      inputValue: tarifa.valor,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || +value <= 0) {
          return 'Por favor ingresa un valor válido mayor a 0';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        tarifa.valor = +result.value;
        Swal.fire('Tarifa actualizada', `El costo para ${tarifa.tipo} ha sido actualizado a $${tarifa.valor}`, 'success');
      }
    });
  }
}
