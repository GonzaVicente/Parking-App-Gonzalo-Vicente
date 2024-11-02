export interface Estacionamiento {
    id: number;
    patente: string;
    horaIngreso: string;
    horaEgreso: string | null;
    costo: number;
    idUsuarioIngreso: number;
    idUsuarioEgreso: number | null;
  }
  