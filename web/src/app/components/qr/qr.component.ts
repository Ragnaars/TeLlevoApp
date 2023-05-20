import { Component, OnInit } from '@angular/core';
import {Platform, PlatformModule} from '@angular/cdk/platform';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

  qrCodeString= "https://drive.google.com/file/d/1qnCFCXqMWgCpvX3cltYirsbQoRj91B_F/view?usp=share_link"
  currentPlatform : string = "";

  constructor(public platform : Platform) {

    if (this.platform.BLINK) {
      console.log('this is Chrome device!');
      this.currentPlatform = 'CHROME';
    }if (this.platform.IOS) {
      console.log('this is IOS device!');
      this.currentPlatform = 'IOS';
    }if (this.platform.ANDROID) {
      console.log('this is ANDROID device!');
      this.currentPlatform = 'ANDROID';

    }
  }

  ngOnInit(): void {
  }

  chrome(){

  }

}
