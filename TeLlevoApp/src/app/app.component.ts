import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public lat :any;
  public long:any;
  constructor(
    protected platform: Platform,
    protected navController:NavController,
    public geolocation:Geolocation
  ) {
    this.platform.ready().then(async () =>{
      this.getGeolocation();
    })
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      console.log("resp",this.lat,this.long)

      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}
