import { Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CocherasService {
  constructor(private auth: AuthService) {}

  async getCocheras(): Promise<Cochera[]> {
    const response = await fetch('http://localhost:4000/cocheras', {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
    return response.json();
  }

  async addCochera() {
    const response = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion: 'Nueva Cochera' }),
    });
    return response.json();
  }

  async deleteCochera(cochera: Cochera) {
    await fetch(`http://localhost:4000/cocheras/${cochera.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  async toggleDisponibilidad(cochera: Cochera) {
    const action = cochera.deshabilitada ? 'enable' : 'disable';
    await fetch(`http://localhost:4000/cocheras/${cochera.id}/${action}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }
}
