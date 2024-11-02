import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from "../../interfaces/login";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  datosLogin: Login = {
    username: 'admin',
    password: 'admin'
  };
  
  router = inject(Router);
  auth = inject(AuthService);

  ngOnInit() {
    if (this.auth.estalogueado()) {
      this.router.navigate(['/estado-cocheras']);
    }
  }

  Login() {
    this.auth.Login(this.datosLogin)
      .then(ok => {
        if (ok) {
          this.router.navigate(['/estado-cocheras']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Credenciales Incorrectas",
          });
        }
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
