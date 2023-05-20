import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import {CarreraService} from "../../services/carrera/carrera.service";
import {Carrera} from "../../interfaces/carrera";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { FbCarreraService } from 'src/app/services/FbCarrera/fb-carrera.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin : {};

  destination : {};
  datauser :any;
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public data :any =[];
  public results :any;
  public valor : boolean = false;
  public user : string = String(localStorage.getItem('email'))

  constructor(
    private CarreraService : FbCarreraService,
    private router:Router,
    private afAuth: AngularFireAuth,
    private carServicio : CarreraService) {
      this.data = [{}]
    }

  ngOnInit() {
    this.afAuth.currentUser.then(user =>{
      console.log(user)
      if(user && user.emailVerified){
        this.datauser = user;
        console.log(user.metadata)
        localStorage.setItem('email',String(user.email))
        console.log("usuario",user)
      }else{
        this.router.navigate(['/registro'])
      }
    })

    // this.carServicio.obtenerPrimerosProductos();
    // this.carServicio.listaCarreras$.subscribe(resp =>{
    //   this.data = resp;
    //   this.results = this.data;
    //   if(this.scroll){
    //     this.scroll.complete();
    //   }

    // })

    this.user = String(localStorage.getItem('email'))

    this.CarreraService.getCarrera().subscribe(carrera=>{
      console.log(carrera);
      this.data = carrera;
      this.results = this.data;
      this.data.forEach((el:any) => {
        if (el["conductor"] == localStorage.getItem('email')) {
          console.log(localStorage.getItem('email'), "existe");
          localStorage.setItem('AptoConducir','no');
          localStorage.setItem('AptoViajar','no');
          return;
        }
      });

      this.data.forEach((el:any) => {
          el["pasajeros"].forEach((pasajeros:any) =>{
            if(pasajeros['email'] == localStorage.getItem('email')){
              console.log(pasajeros['email'])
              localStorage.setItem('AptoViajar','no');
              localStorage.setItem('AptoConducir','no');
              return;
            }
          })
      });
      if(this.scroll){
        this.scroll.complete();
      }
    })

  }


  ionViewWillEnter(){
    // this.carServicio.obtenerPrimerosProductos();
    // this.carServicio.listaCarreras$
  }


  cargarMasElementos(){
    this.carServicio.obtenerMasElementos();
  }

  // handleChange(event:any) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data;
  //   if(query && query.trim() !=''){
  //     this.results = this.results.filter((data:any)=>{
  //       return (data.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1);
  //     });
  //   }
  // }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.CarreraService.getCarrera();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  onIonInfinite(ev:any) {
  this.CarreraService.getCarrera;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  handleChange(event:any) {
    const text = event.target.value;
    this.results = this.data;
    if(text && text.trim()!=''){
      this.results = this.results.filter((data:any)=>{
        return (data.conductor.toLowerCase().indexOf(text.toLowerCase())>-1) || (data.endAddress.toLowerCase().indexOf(text.toLowerCase())>-1) ;
      })
    }
  }
}
