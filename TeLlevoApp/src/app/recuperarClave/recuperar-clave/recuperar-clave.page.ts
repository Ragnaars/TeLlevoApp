import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error/firebase-error.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {

  recuperarUsuario: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    public afAuth : AngularFireAuth,
    private fb : FormBuilder,
    private router : Router,
    private fireError: FirebaseErrorService
  ) {
    this.recuperarUsuario = this.fb.group({
      usuario : ['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit() {
    console.log('he iniciado')
  }

  recuperar(){
    const email = this.recuperarUsuario.value.usuario;
    console.log(email)
    this.afAuth.sendPasswordResetEmail(email).then(async ()=>{
      alert('email enviado')
      const toast = await this.toastController.create({
        message: 'Email enviado!',
        duration: 1500,
        position: 'top'
      });

      await toast.present();
      this.router.navigate(['/login'])
    }).
    catch(async e=>{
      this.fireError.codeError(e.code);
      let alerta = await this.alertController.create({
        header: "Error",
        message: this.fireError.codeError(e.code),
        buttons: ['OK']
      });
      alerta.present();
    })

  }
}
