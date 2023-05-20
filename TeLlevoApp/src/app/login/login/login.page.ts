import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Usuario } from "../../interfaces/usuario";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {FirebaseErrorService} from "../../services/firebase-error/firebase-error.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  document:any;
  elem: [];
  formularioLogin: FormGroup;
  email : string;
  message: any;




  constructor(
    private toastController: ToastController,
    private fireError : FirebaseErrorService,
    public afAuth : AngularFireAuth,
    public http: HttpClient,
    public servicio: UsuarioService,
    public fb: FormBuilder,
    public router: Router,
    public alertController: AlertController) {
    this.formularioLogin = this.fb.group({
      usuario: new FormControl("", [Validators.required]),
      contraseña: new FormControl("", Validators.required),
    })
  }

  log(){
    var email = this.formularioLogin.value.usuario;
    this.message = 'bienvenido,'+email+'!'
    var contraseña = this.formularioLogin.value.contraseña;

    this.afAuth.signInWithEmailAndPassword(email, contraseña).then((user) =>{
      console.log(user);
      if(user.user?.emailVerified){
        localStorage.setItem('email',email);
        localStorage.setItem('id',user.user.uid);
        localStorage.setItem('AptoConducir',"si");
        localStorage.setItem('AptoViajar','si');
        this.router.navigate(['/tabs/listar'])
        this.alerta();

      }else{
        this.router.navigate(['/verificar-correo'])
      }

    }).
    catch(async e => {
      this.fireError.codeError(e.code);
      let alerta = await this.alertController.create({
        header: "Error",
        message: this.fireError.codeError(e.code),
        buttons: ['OK']
      });
      alerta.present();
    })
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return "El ususario ya existe"
      case 'auth/weak-password':
        return "La contraseña es muy debil";
      case 'auth/invalid-email':
        return "Correo invalido";
      default:
        return "error desconocido";
    }
  }

  irReg(){
    this.router.navigate(['/registro'])
  }

  async alerta(){
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000,
      position: 'top'
    });

    await toast.present()
      }

    async alerta2(){
        let alert = await this.alertController.create({
          header: "Datos no existentes",
          message: "Tienes que llenar los datos",
          buttons: ['Aceptar']
        });

        alert.present();
      }


      ngOnInit() {
      }


    }
