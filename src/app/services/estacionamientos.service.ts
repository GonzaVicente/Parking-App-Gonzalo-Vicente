import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientosService {
  constructor(private auth: AuthService) {}

  obtenerEstacionamientos() {
    // Implementación existente para obtener estacionamientos
  }

  abrir(patente: string, idCochera: number) {
    return fetch("http://localhost:4000/estacionamientos/abrir", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patente: patente,
        idCochera: idCochera,
        idUsuarioIngreso: "admin" // Ajusta este valor según sea necesario
      })
    }).then(res => res.json());
  }

  actualizarUsos(idCochera: number, monto: number) {
    const usos = parseInt(localStorage.getItem(`usos_${idCochera}`) || '0', 10) + 1;
    const cobrado = parseFloat(localStorage.getItem(`cobrado_${idCochera}`) || '0') + monto;

    localStorage.setItem(`usos_${idCochera}`, usos.toString());
    localStorage.setItem(`cobrado_${idCochera}`, cobrado.toFixed(2));
  }
}