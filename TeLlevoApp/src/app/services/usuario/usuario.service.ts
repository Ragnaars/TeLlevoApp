import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import {Usuario,UsuarioId} from "../../interfaces/usuario";
import { delay } from 'rxjs/operators';
import {Auth,createUserWithEmailAndPassword} from "@angular/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public UrlApi = "http://localhost:3000/usuario/";
  private comLista = new BehaviorSubject<Array<UsuarioId>>([]);
  private Page = 1;
  public listaUsuarios$ = this.comLista.asObservable();
  constructor(private http:HttpClient,private auth:Auth) { }

  register({email , password}:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }


  public guardarUsuario (usuario:Usuario):Observable<UsuarioId> {
    // return this.http.post<ProductoConId>(this.UrlApi, producto, {
    //   headers : {
    //     'Content-Type':'application/json; charset=utf-8'
    //   }
    // })
    return this.http.post<UsuarioId>(this.UrlApi,usuario, {
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
  }


  public eliminarUsuario(id:number): Observable<any>{
    // const path = this.UrlApi + id;
    // return this.http.delete(path)

    return this.http.delete(`${this.UrlApi}/${id}`);
  }

  public obtenerPrimerosUsuarios(){
    this.http.get<UsuarioId[]>(`${this.UrlApi}?_page=1`).pipe(
      delay(2000)
    )
    .subscribe(resp =>{
      this.Page = this.Page+1;
      this.comLista.next(resp);
    })
  }

  public obtenerMasElementos(){
    this.http.get<Array<UsuarioId>>(`${this.UrlApi}?_page=${this.Page}`).pipe(
      delay(2000)
    ).subscribe(resp =>{
      this.Page = this.Page + 1;
      this.comLista.next(this.comLista.getValue().concat(resp));
    })
  }

}
