import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from "../../services/usuario/usuario.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {FirebaseErrorService} from "../../services/firebase-error/firebase-error.service";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  public data: Array<any> = [];
  public u: string;
  public user: Array<any> = [];
  public formularioReg: FormGroup;

  constructor(
    private fireError: FirebaseErrorService,
    private afAuth: AngularFireAuth,
    public servicio: UsuarioService, public alertController: AlertController, public fb: FormBuilder, public toastController: ToastController, public router: Router) {
    this.formularioReg = this.fb.group({
      "usuario": new FormControl("", [Validators.required]),
      "contraseña": new FormControl("", [Validators.required, Validators.minLength(3)]),
      "rcontraseña": new FormControl("", [Validators.required]),
    })
  }

  async registrarse() {
    const email = this.formularioReg.value.usuario;
    const contraseña = this.formularioReg.value.contraseña;
    const rcontraseña = this.formularioReg.value.rcontraseña;

    if(contraseña != rcontraseña){
      let alerta = await this.alertController.create({
        header: "Error",
        message: 'las claves deben coincidir',
        buttons: ['OK']
      });
      alerta.present();
    }

    this.afAuth.createUserWithEmailAndPassword(email, contraseña).then((user) => {
      this.verificarCorreo();
      // this.router.navigate(['/login'])
    }).
      catch(async e => {
        console.log(e)
        let alerta = await this.alertController.create({
          header: "Error",
          message: this.fireError.codeError(e.code),
          buttons: ['OK']
        });
        alerta.present();
      });
  }

  verificarCorreo(){
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())
    .then(async()=>{
      let alerta = await this.alertController.create({
        header: "Hemos enviado un correo para su verificacion",
        message: 'Revise su carpeta de spam',
        buttons: ['OK']
      });
      alerta.present();
      this.router.navigate(['/login'])
    });
  }

  irLog() {
    this.router.navigate(['/login'])
  }

  ngOnInit() {

    // this.servicio.obtenerPrimerosUsuarios();
    // this.servicio.listaUsuarios$.subscribe((resp) => {
    //   this.data = resp;
    //   console.table(this.data)
    // })
  }

  ionVieWillEnter() {
    // this.servicio.obtenerPrimerosUsuarios();
    // this.servicio.listaUsuarios$.subscribe((resp: any) => {
    //   this.data = resp;
    //   console.table(this.data)
    // })

  }

}
