import { Component, ElementRef, OnInit, Renderer2, Type, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CarreraService } from "../../services/carrera/carrera.service";
import { Carrera } from "../../interfaces/carrera";
import { GmapsService } from 'src/app/services/googmaps/gmaps.service';
import { exit } from 'process';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { count } from 'console';
import { FbCarreraService } from 'src/app/services/FbCarrera/fb-carrera.service';


export interface Comentario {
  autor: string;
  comentario: string;
  fecha: any
}
export interface pasajero {
  id: string | null,
  email: string | null,
}
@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  parametroId: Carrera;
  data: any = []
  tuPrecio: number;
  conductor: string;
  carrera = {};
  kmString: String;
  km: number;
  capacidad: number;
  lat1: any;
  lat2: any;
  lng1: any;
  lng2: any;
  endAddress: String;
  startAddress: String;
  precio: number;
  map: any;
  pasajeros: pasajero[];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  sentados: Array<any> = [];
  public listaPasajeros: Array<any> = [];
  correos: Array<any> = [];
  pasajerosSentados: number;
  total: number;
  comentario: Comentario[]
  public formularioComentario: FormGroup;
  public fecha = Date.now();
  com: any;
  registrado: boolean = false;
  e = localStorage.getItem('email');

  // parque simon bolivar


  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private carreraService: FbCarreraService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private modalCtrl: ModalController
  ) {
    this.formularioComentario = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(30)]],
      fecha: this.fecha,
      autor: String(localStorage.getItem('email')),
    })
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      var location = new googleMaps.LatLng(Number(this.lat1), Number(this.lng1));

      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.lat1, lng: this.lng1 },
        zoom: 15,
      });
      this.directionsDisplay.setMap(this.map);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEl.classList.add('show-map')
        this.renderer.addClass(mapEl, 'visible');
        this.directionsService.route({
          origin: { lat: Number(this.lat1), lng: Number(this.lng1) },
          destination: { lat: this.lat2, lng: this.lng2 },
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      })
    } catch (e) {
      console.log(e);
    }

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadMap();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  ngOnInit(): void {
    this.loadMap();



    setTimeout(() => {
      this.carreraService.eliminar(this.parametroId)
      localStorage.setItem('AptoViajar', 'si');
      localStorage.setItem('AptoConducir', 'si');
    }, 500000)


    this.rutaActiva.params.subscribe(parametro => {
      console.log(parametro);
      this.parametroId = parametro['idCarrera'];
    });
    //  this.carServicio.getCarrera(Number(this.parametroId))?.
    //    subscribe(carrera => {
    //      console.log("detalles", carrera);
    //      this.data = carrera;
    //      this.conductor = this.data.conductor;
    //      this.capacidad = this.data.capacidad;
    //      this.km = this.data.km;
    //      this.kmString = this.data.kmString;
    //      this.lat1 = this.data.lat1;
    //      this.lat2 = this.data.lat2;
    //      this.lng1 = this.data.lng1;
    //      this.lng2 = this.data.lng2;
    //      this.endAddress = this.data.endAddress;
    //      this.precio = this.data.precio;
    //      this.pasajeros = this.data.pasajeros;
    //      console.log('pasajeros',this.pasajeros);
    //      this.pasajerosSentados = this.pasajeros.length;
    //      console.log('correo',this.correos)
    //    });

    this.carreraService.getById(this.parametroId).subscribe(resp => {
      console.log('resp', resp)
      this.data = resp;
      this.conductor = this.data.conductor;
      this.capacidad = this.data.capacidad;
      this.km = this.data.km;
      this.kmString = this.data.kmString;
      this.lat1 = Number(this.data.lat1);
      this.lat2 = this.data.lat2;
      this.lng1 = Number(this.data.lng1);
      this.lng2 = this.data.lng2;
      this.startAddress = this.data.startAddress;
      this.endAddress = this.data.endAddress;
      this.precio = this.data.precio;
      this.pasajeros = this.data.pasajeros;
      this.comentario = this.data.comentario;
      console.log("pasa", this.pasajeros);
      this.pasajeros.forEach((datos: any) => {
        if (datos['email'] == localStorage.getItem('email')) {
          this.registrado = true;
          console.log('hecho :D', datos['email'])
          console.log('reg', this.registrado)
        }
      })
      if (this.comentario === undefined) {
        this.comentario = []
      }
      console.log('pasajeros', this.pasajeros);
      this.pasajerosSentados = this.pasajeros.length;
      this.total = this.precio / this.pasajerosSentados;
      console.log('correo', this.correos)
    });
    this.pasajerosSentados = this.listaPasajeros.length;
    this.total = this.precio / this.pasajerosSentados;
  }



  verificarUsuariosRegistrado(email: any) {
    for (let i = 0; i < this.listaPasajeros.length; i++) {
      // if (email == this.listaPasajeros[i].email) {
      //   alert('Ya estás registrado en este viaje');
      //   this.irInicio();
      this.correos = this.listaPasajeros[i].email;
    }
    if (this.correos.includes(email)) {
      alert('Ya estas registrado.');
      this.irInicio();
    }
  }


  irInicio() {
    this.router.navigate(['/tabs/listar'])
  }

  async agregarPasajero() {
    var email = localStorage.getItem('email');
    var id = localStorage.getItem('id');
    var user = { id, email }
    var disp = localStorage.getItem('AptoViajar')
    // const found = this.pasajeros.find(x => x == null);
    // if(found == null){
    //   console.log('null ecnontrado',found)
    //   this.pasajeros.shift();
    // }
    if (disp == "no") {
      let alerta = await this.alertController.create({
        header: "Error",
        message: 'Ya estás registrado en un viaje',
        buttons: ['OK']
      });
      alerta.present();
      this.router.navigate(['/tabs/listar']);
      return;
    }
    if (this.pasajeros.length == this.capacidad) {
      let alerta = await this.alertController.create({
        header: "Error",
        message: 'Auto lleno',
        buttons: ['OK']
      });
      alerta.present();
      this.router.navigate(['/tabs/listar']);
      return;
    }

    if (email == this.conductor) {
      let alerta = await this.alertController.create({
        header: "Error",
        message: 'Eres el conductor, no puedes registrarte',
        buttons: ['OK']
      });
      alerta.present();
      this.router.navigate(['/tabs/listar']);
      return;
    }
    this.listaPasajeros = Object.values(this.pasajeros);

    for (let i = 0; i < this.listaPasajeros.length; i++) {
      this.correos = this.listaPasajeros[i].email;
    }
    if (this.correos.includes(email)) {
      let alerta = await this.alertController.create({
        header: "Error",
        message: 'Ya estás registrado',
        buttons: ['OK']
      });
      alerta.present();
      this.router.navigate(['/tabs/listar'])
      return;
    }

    this.pasajeros.push(user);
    console.log('mis pasajeros', this.listaPasajeros)
    this.pasajerosSentados = this.pasajeros.length;
    this.total = this.precio / this.pasajerosSentados;
    // this.carServicio.guardarPasajeros(Number(this.parametroId), {
    //   conductor: this.conductor,
    //   capacidad: this.data.capacidad,
    //   km: this.data.km,
    //   kmString: this.data.kmString,
    //   lat1: this.data.lat1,
    //   lat2: this.data.lat2,
    //   lng1: this.data.lng1,
    //   lng2: this.data.lng2,
    //   endAddress: this.data.endAddress,
    //   precio: this.data.precio,
    //   pasajeros: this.pasajeros
    // }).subscribe(x => {
    //   console.log(x);
    // })
    this.carreraService.Actualizar(this.parametroId, {
      conductor: this.conductor,
      capacidad: this.data.capacidad,
      km: this.data.km,
      kmString: this.data.kmString,
      lat1: this.data.lat1,
      lat2: this.data.lat2,
      lng1: this.data.lng1,
      lng2: this.data.lng2,
      startAddress: this.data.startAddress,
      endAddress: this.data.endAddress,
      precio: this.data.precio,
      pasajeros: this.pasajeros,
    })


    const toast = await this.toastController.create({
      message: 'Registrado con exito!',
      duration: 2000,
      position: 'top'
    });

    await toast.present();
    localStorage.setItem('AptoViajar', 'no')
    localStorage.setItem('AptoConducir', 'no')
  }

  async agregarComentario() {
    let email = localStorage.getItem('email')

    if (this.registrado === true || email == this.conductor) {
      let comm = this.comentario
      if (comm.length >= 5) {
        comm.shift()
      }
      this.com = this.formularioComentario.value;
      console.log(this.com)
      console.log('ahora asi', comm)
      comm.push(this.com)


      this.carreraService.ActualizarComentario(this.parametroId, {
        conductor: this.conductor,
        capacidad: this.data.capacidad,
        km: this.data.km,
        kmString: this.data.kmString,
        lat1: parseFloat(this.data.lat1),
        lat2: parseFloat(this.data.lat2),
        lng1: parseFloat(this.data.lng1),
        lng2: parseFloat(this.data.lng2),
        startAddress: this.data.startAddress,
        endAddress: this.data.endAddress,
        precio: this.data.precio,
        comentario: comm,

      })
    } else {

      const toast = await this.toastController.create({
        message: 'Debes estar registrado en el viaje para comentar',
        duration: 2000,
        position: 'top'
      });

      await toast.present();
      this.router.navigate(['/tabs/listar'])
      return
    }


  }

  close() {
    this.modalCtrl.dismiss();
  }

  eliminarUsuario(id: string | null, email: string | null) {
    var pas = { id, email };
    var x;
    console.log(id, email)
    this.pasajeros.forEach(pasajero => {
      console.log(pasajero['email'])
      if (pasajero['email'] == email) {
        console.log(pasajero);
        x = this.pasajeros.indexOf(pasajero);
        console.log(x)
        this.pasajeros.splice(x, x + 1)
        this.carreraService.Actualizar(this.parametroId, {
          conductor: this.conductor,
          capacidad: this.data.capacidad,
          km: this.data.km,
          kmString: this.data.kmString,
          lat1: this.data.lat1,
          lat2: this.data.lat2,
          lng1: this.data.lng1,
          lng2: this.data.lng2,
          startAddress: this.data.startAddress,
          endAddress: this.data.endAddress,
          precio: this.data.precio,
          pasajeros: this.pasajeros
        });
        if (this.e == pasajero['email']) {
          console.log('registrado', this.e)
          localStorage.setItem('AptoViajar', 'si');
          localStorage.setItem('AptoConducir', 'si');
          this.registrado = false;
        }
      }
    })
  }

  salirme() {

    var email = localStorage.getItem('email');
    var x;
    this.pasajeros.forEach(pasajero => {
      console.log(pasajero['email'])
      if (pasajero['email'] == email) {
        console.log(pasajero);
        x = this.pasajeros.indexOf(pasajero);
        console.log(x)
        this.pasajeros.splice(x, x + 1)
        this.carreraService.Actualizar(this.parametroId, {
          conductor: this.conductor,
          capacidad: this.data.capacidad,
          km: this.data.km,
          kmString: this.data.kmString,
          lat1: this.data.lat1,
          lat2: this.data.lat2,
          lng1: this.data.lng1,
          lng2: this.data.lng2,
          startAddress: this.data.startAddress,
          endAddress: this.data.endAddress,
          precio: this.data.precio,
          pasajeros: this.pasajeros
        })
      }
    })
    localStorage.setItem('AptoViajar', 'si');
    localStorage.setItem('AptoConducir', 'si');
    this.registrado = false;
  }

  async comenzar() {
    if (this.pasajeros.length == 0) {
      const alert = await this.alertController.create({
        header: 'No puedes comenzar un viaje sin pasajeros.',
        message: 'Eliminalo o espera a los pasajeros',
        animated: true,
        buttons: ['Aceptar']
      });
      alert.present();
      return
    } else {
      if(this.e != this.conductor){
        console.log('usuario')
        let msj = "Tu deuda con el conductor es de: " + this.total
        const alert = await this.alertController.create({
          header: 'El viaje comenzará',
          message: msj,
          animated: true,
          buttons: ['Aceptar']
        });
        alert.present();
        this.carreraService.eliminar(this.parametroId);
        this.registrado = false;
        localStorage.setItem('AptoConducir', 'si');
        localStorage.setItem('AptoViajar', 'si');
        this.router.navigate(['/tabs/listar']);
      }else if(this.e == this.conductor){
        console.log('Conductor')
        const alert = await this.alertController.create({
          header: 'El viaje comenzará',
          message: 'Tip: recuerda siempre usar cinturon de seguridad',
          animated: true,
          buttons: ['Aceptar']
        });
        alert.present();
        this.carreraService.eliminar(this.parametroId);
        localStorage.setItem('AptoConducir', 'si');
        localStorage.setItem('AptoViajar', 'si');
        this.router.navigate(['/tabs/listar']);


      }
    }

  }
}
