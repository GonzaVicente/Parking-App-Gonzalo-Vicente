import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EstacionamientosService } from '../../services/estacionamientos.service';

interface Reporte {
  mes: string;
  usos: number;
  cobrado: number;
}

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {
  auth = inject(AuthService);
  estacionamientosService = inject(EstacionamientosService);
  reportes: Reporte[] = [];

  ngOnInit() {
    this.generarReportes();
  }
  
  generarReportes() {
    const reporteMap = new Map<string, { usos: number; cobrado: number }>();
  
    // Simulamos obtener los datos del almacenamiento local
    for (let i = 1; i <= 100; i++) { // Suponiendo un máximo de 100 cocheras
      const usos = parseInt(localStorage.getItem(`usos_${i}`) || '0', 10);
      const cobrado = parseFloat(localStorage.getItem(`cobrado_${i}`) || '0');
  
      if (usos > 0) {
        const mesFormato = this.obtenerMesFormato(new Date()); // Usa la fecha actual como ejemplo
        if (!reporteMap.has(mesFormato)) {
          reporteMap.set(mesFormato, { usos: 0, cobrado: 0 });
        }
  
        const reporte = reporteMap.get(mesFormato)!;
        reporte.usos += usos;
        reporte.cobrado += cobrado;
      }
    }
  
    this.reportes = Array.from(reporteMap.entries()).map(([mes, data], index) => ({
      mes,
      usos: data.usos,
      cobrado: data.cobrado
    }));
  
    this.reportes.sort((a, b) => this.compararMeses(a.mes, b.mes));
  }

  obtenerMesFormato(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return fecha.toLocaleDateString('es-ES', opciones);
  }

  compararMeses(mes1: string, mes2: string): number {
    const [mes1Nombre, año1] = mes1.split(' ');
    const [mes2Nombre, año2] = mes2.split(' ');
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const fecha1 = new Date(parseInt(año1), meses.indexOf(mes1Nombre.toLowerCase()));
    const fecha2 = new Date(parseInt(año2), meses.indexOf(mes2Nombre.toLowerCase()));
    return fecha1.getTime() - fecha2.getTime();
  }
  
}
