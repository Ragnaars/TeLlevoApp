export interface pasajero {
  id? : string,
  email?: string,
}

export interface Carrera {
  conductor : string ;
  km: number;
  kmString : string;
  capacidad : number;
  lng1 : number;
  lng2:number;
  lat1 : number;
  lat2 : number;
  endAddress : string
  precio: number;
  pasajeros:[pasajero?]
}
export interface CarreraId extends Carrera{
  id : number;
}

export interface CarreraParcial extends Partial<Carrera>{

}

