import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }


  codeError(code: string) {
    switch (code) {
      //correo existe
      case 'auth/email-already-in-use':
        return "El ususario ya existe"
        //contraseña debil
      case 'auth/weak-password':
        return "La contraseña es muy debil";

        //correo invalido
      case 'auth/invalid-email':
        return "Correo invalido";
      //contraseña incorrect
      case 'auth/wrong-password':
        return "Contraseña invalida"

      case 'auth/user-not-found':
        return 'Usuario no encontrado'

      case 'auth/internal-error':
        return 'Error interno'

      default:
        return "error desconocido";
    }
  }

}
