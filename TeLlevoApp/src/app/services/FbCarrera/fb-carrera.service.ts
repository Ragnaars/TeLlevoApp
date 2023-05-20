import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData,docData, doc, updateDoc} from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Carrera } from "../../interfaces/carrer";
@Injectable({
  providedIn: 'root'
})
export class FbCarreraService {

  constructor(
    private firestore: Firestore) { }

  addCarrera(carrera: Carrera) {
    const carreraRef = collection(this.firestore, 'carrera');
    return addDoc(carreraRef, carrera);
  }

  getCarrera(): Observable<Carrera[]> {
    const carreraRef = collection(this.firestore, 'carrera');
    return collectionData(carreraRef,{idField: 'id'}) as Observable<Carrera[]>;
  }

  getById(id:any){
    const carreraRef = doc(this.firestore,`carrera/${id}`);
    return docData(carreraRef);
  }

  Actualizar(id:any,carrera:Carrera){
    const carreraRef = doc(this.firestore,`carrera/${id}`);
    return updateDoc(carreraRef,{pasajeros:carrera.pasajeros}).then(x=>{
      console.log('ahora soy :D',x)
    });
  }

  ActualizarComentario(id:any,carrera:Carrera){
    const carreraRef = doc(this.firestore,`carrera/${id}`);
    return updateDoc(carreraRef,{comentario:carrera.comentario}).then(x=>{
      console.log('ahora soy :D',x)
    });
  }

  eliminar(id : any){
    const carreraRef = doc(this.firestore,`carrera/${id}`);
    return deleteDoc(carreraRef);
  }

}


