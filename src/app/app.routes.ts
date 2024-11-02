import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard] // Permite el acceso solo si no está logueado
    },
    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent,
        canActivate: [AuthGuard] // Protege la ruta
    },
    {
        path: "reportes",
        component: ReporteComponent,
        canActivate: [AuthGuard] // Protege la ruta
    },
    {
        path: "precios",
        component: PreciosComponent,
        canActivate: [AuthGuard] // Protege la ruta
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
];
