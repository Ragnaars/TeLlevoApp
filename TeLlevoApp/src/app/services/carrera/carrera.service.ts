import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, BehaviorSubject, delay } from 'rxjs';
import {Carrera, CarreraId} from "../../interfaces/carrera";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  public UrlApi = "http://localhost:3000/carrera/";
  private comLista = new BehaviorSubject<Array<CarreraId>>([]);
  private Page = 1;
  public listaCarreras$ = this.comLista.asObservable();
  constructor(private http:HttpClient) { }

  public getCarrera (id:number): Observable<CarreraId> | null{
    return this.http.get<CarreraId>(`${this.UrlApi}/${id}`)
  }

  public eliminarCarrera(id:number): Observable<any>{
    // const path = this.UrlApi + id;
    // return this.http.delete(path)

    return this.http.delete(`${this.UrlApi}/${id}`);
  }

  public guardarPasajeros(id:number,carrera:Carrera){
    return this.http.patch(`${this.UrlApi}/${id}`,carrera);
  }

  public fetch(){

  }



  public obtenerPrimerosProductos(){
    this.http.get<CarreraId[]>(`${this.UrlApi}?_page=1`).pipe(
      delay(2000)
    )
    .subscribe(resp =>{
      this.Page = this.Page+1;
      this.comLista.next(resp);
    })
  }

  public obtenerMasElementos(){
    this.http.get<Array<CarreraId>>(`${this.UrlApi}?_page=${this.Page}`).pipe(
      delay(2000)
    ).subscribe(resp =>{
      this.Page = this.Page + 1;
      this.comLista.next(this.comLista.getValue().concat(resp));
    })
  }

  public guardarCarrera (carrera:Carrera):Observable<CarreraId> {
    // return this.http.post<ProductoConId>(this.UrlApi, producto, {
    //   headers : {
    //     'Content-Type':'application/json; charset=utf-8'
    //   }
    // })
    return this.http.post<CarreraId>(this.UrlApi,carrera, {
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
  }


}
