export interface Carrera {
  id?: string;
  conductor : string ;
  km: number;
  kmString : string;
  capacidad : number;
  lng1 : number;
  lng2:number;
  lat1 : number;
  lat2 : number;
  startAddress : string;
  endAddress : string
  precio: number;
  pasajeros?:any
  fecha?: any;
  comentario?:any
}
export interface pasajero {
  id? : string,
  email?: string,
}
export interface comentario {
  comentario? : string;
  fecha?: any;
  autor?: string;
}
