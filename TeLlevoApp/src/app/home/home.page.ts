import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { GmapsService } from '../services/googmaps/gmaps.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { AppComponent } from '../app.component';
import { CarreraService } from "../services/carrera/carrera.service";
import { Router } from "@angular/router";
import { FbCarreraService } from "../services/FbCarrera/fb-carrera.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage implements OnInit {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;

  public fecha = Date.now();
  datauser: any;
  googleMaps: any;
  total: number;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  location2: any;
  arr: any[] = [];
  lat1: any;
  long1: any;
  markB: {};
  center = { lat: (this.app.lat), lng: this.app.long }
  public km: number;
  endAddress: string | undefined;
  kmString: string;
  id = '1'
  email: ''
  pasajero: {}
  arr2: unknown[];
  latt: any;
  lngg: any;
  startAddress: string | undefined;

  constructor(
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private carServicio: CarreraService,
    private app: AppComponent,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private CarreraService: FbCarreraService) { }

  ngOnInit() {
    this.app.getGeolocation();
    this.afAuth.currentUser.then(user => {
      console.log(user)
      if (user && user.emailVerified) {
        this.datauser = user;
        console.log(user.metadata)
        localStorage.setItem('email', String(user.email))
        console.log("usuario", user)
      } else {
        this.router.navigate(['/registro'])
      }
    })
    this.fetchLocation();
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }
  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(parseFloat(this.center.lat), parseFloat(this.center.lng));

      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 11,
      });
      this.directionsDisplay.setMap(this.map);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      })

      this.addMarker(location);
      this.onMapClick();
    } catch (e) {
      console.log(e);
    }

  }
  addMarker(location: any) {
    if (this.markers.length < 2) {
      let googleMaps: any = this.googleMaps;
      if (this.markers.length >= 1) {
        const icon = {
          url: '/assets/icon/location2.png',
          scaledSize: new googleMaps.Size(50, 50),
        };
        const marker = new googleMaps.Marker({

          position: location,
          map: this.map,
          icon: icon,
          // draggable: true;
          animation: googleMaps.Animation.DROP
        });
        this.markers.push(marker);

        // this.km = this.calculateDistance(this.app.long, this.long1, this.app.lat, this.lat1);
        this.directionsService.route({
          origin: { lat: parseFloat(this.app.lat), lng: parseFloat(this.app.long) },
          destination: { lat: parseFloat(this.latt), lng: parseFloat(this.lngg) },
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
            this.km = Number(this.directionsDisplay.getDirections()?.routes[0].legs[0].distance?.value) / 1000;    //para obtener todos los datos que necesitoooooooooooooooooooo
            console.log(this.directionsDisplay.getDirections()?.routes[0].legs[0].distance);
            this.endAddress = this.directionsDisplay.getDirections()?.routes[0].legs[0].end_address;
            this.startAddress = this.directionsDisplay.getDirections()?.routes[0].legs[0].start_address;
            this.kmString = String(this.directionsDisplay.getDirections()?.routes[0].legs[0].distance?.text);
            this.total = Math.round(500 * this.km)
            if (this.total < 1000) {
              this.total = 1000;
            }
            console.log("km", this.km);

          } else {
            alert('Could not display directions due to: ' + status);
          }
        });

        this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
          console.log('markerclick', marker);
          //this.getAdress(this.marker.position.lat(), this.marker.position.lng());
          this.checkAndRemoveMarker(marker);
          console.log('markers : ', this.markers);
        })
      } else {
        const icon = {
          url: '/assets/icon/location.png',
          scaledSize: new googleMaps.Size(50, 50),
        };
        const marker = new googleMaps.Marker({

          position: location,
          map: this.map,
          icon: icon,
          // draggable: true;
          animation: googleMaps.Animation.DROP
        });

        this.markB = { lat: this.lat1, lng: this.long1 }
        this.markers.push(marker);

        this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
          console.log('markerclick', marker);
          //this.getAdress(this.marker.position.lat(), this.marker.position.lng());
          this.checkAndRemoveMarker(marker);
          console.log('markers : ', this.markers);
        })
      }

    } else {

    }

  }

  checkAndRemoveMarker(marker: any) {
    const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
    console.log('is marker already: ', index);
    if (index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(this.map, 'click', (mapsMouseEvent: any) => {
      this.latt = mapsMouseEvent.latLng.lat((lat: any) => {
        this.latt = lat
        console.log(this.latt)
      });
      this.lngg = mapsMouseEvent.latLng.lng((lng: any) => {
        this.lngg = lng
        console.log(this.lngg)
      });
      console.log('locationn', this.latt, this.lngg)
      console.log(mapsMouseEvent)
      // console.log("string",this.location2);
      // this.arr = this.location2.split(',');
      // console.log('arr',this.arr2)
      // console.log('afer string',this.arr[0])
      // this.lat1 = Number(parseFloat(this.arr[0].slice(1)))
      // console.log('lat1',this.lat1)
      // console.log('afer string',this.arr[1])
      // this.long1 = Number(parseFloat(this.arr[1].slice(0, -1)))
      // console.log('long1',this.long1)
      // console.log('locationoo',this.lat1,',',this.long1)
      this.addMarker(mapsMouseEvent.latLng);
    });
  }

  calculateDistance(lon1: any, lon2: any, lat1: any, lat2: any) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }

  async fetchLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    // console.log('Current position:', coordinates);
    // this.currentLT = parseFloat(String(coordinates.coords.latitude));
    // this.currentLG = parseFloat(String(coordinates.coords.longitude));
    // console.log("currentt : ",this.currentLT,this.currentLG);

  }

  async aplicar() {
    var verificador = localStorage.getItem('AptoConducir');
    var verificador2 = localStorage.getItem('AptoViajar');
    if (verificador == "no") {
      let alert = await this.alertController.create({
        header: "Ya tienes un viaje creado",
        message: "borra el anterior o finalizalo",
        buttons: ['OK']
      });

      alert.present();
      this.router.navigate(['/tabs/listar']);
      return;
    }

    if (verificador2 == "no") {
      let alert = await this.alertController.create({
        header: "Pasajero",
        message: "Estás registrado en un viaje",
        buttons: ['OK']
      });

      alert.present();
      this.router.navigate(['/tabs/listar']);
      return;
    }
    const response = await this.CarreraService.addCarrera({
      conductor: String(localStorage.getItem('email')),
      kmString: this.kmString,
      km: this.km,
      capacidad: 4,
      lat1: this.app.lat,
      lat2: this.latt,
      lng1: this.app.long,
      lng2: this.lngg,
      startAddress: String(this.startAddress),
      endAddress: String(this.endAddress),
      precio: this.total,
      pasajeros: [],
      fecha: this.fecha
    });
    console.log("hecho")
    console.log('response', response)
    this.router.navigate(['/tabs/listar'])
    localStorage.setItem('AptoConducir', 'no')
    localStorage.setItem('AptoViajar', 'no')
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.app.getGeolocation();
      this.fetchLocation();
      this.loadMap();
      // Any calls to load data go here
      event.target.complete();

    }, 2000);
  };

  async duoc() {
    let lat: number = -33.5988;
    let lng: number = -70.70528;
    let googleMaps: any = await this.gmaps.loadGoogleMaps();
    this.googleMaps = googleMaps;
    const location = new googleMaps.LatLng(lat, lng);
    console.log(location)
    this.addMarker(location);
  }

}
