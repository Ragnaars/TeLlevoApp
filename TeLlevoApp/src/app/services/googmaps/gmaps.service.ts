import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor() { }

  apiKey = 'AIzaSyBFJ-Z0sAEcLh5IrkwGxgnlLkWPirj_t98';

  loadGoogleMaps(): Promise<any>{
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps){
      return Promise.resolve(gModule.maps)
    }
    return new Promise((resolve, reject) =>{
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () =>{
        const loadedGoogleModules = win.google;
        if(loadedGoogleModules && loadedGoogleModules.maps){
          resolve(loadedGoogleModules.maps)
        }else{
          reject('Google Map SDK is not Available');
        }
      };
    })
  }
}
