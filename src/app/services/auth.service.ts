import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  estalogueado(): boolean {
    return !!this.getToken();
  }

  Login(datosLogin: Login) {
    return fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosLogin)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'ok') {
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');  // Elimina el token del localStorage
  }
}
