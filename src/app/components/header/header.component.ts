import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // Agrega RouterModule aquí
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  auth = inject(AuthService);
  router = inject(Router);

  async abrirModal() {
    const confirmacion = await Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: 'Esta acción cerrará la sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      this.auth.logout(); // Llama al logout para eliminar el token
      this.router.navigate(['/login']); // Redirige al login
      Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente.', 'success');
    }
  }
}
