import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  constructor(private geolocation: Geolocation, private localStorage: LocalStorageService, private router: Router, public alertController: AlertController, private camera: Camera) { }

  ngOnInit() {
    console.log("getting position");
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPosition.lat = resp.coords.latitude;
      this.currentPosition.lon = resp.coords.longitude

      console.log(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

  selectedSegment;
  currentPosition = {
    lat: -1,
    lon: -1
  }

  place = {
    name: "",
    description: "",
    danger: false,
    picture: ""
  }

  segmentChanged(ev: any) {
    console.log(this.selectedSegment);
  }

  savePlace(){
    console.log("saving " + this.place);

    this.localStorage.savePlace(this.place);

    this.router.navigateByUrl("/home");

  }

  async confirmDeletion(){
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'You are about to delete this place',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });

    await alert.present();
  }

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  takePhoto(){
    this.camera.getPicture(this.cameraOptions).then((imageUri) => {
      console.log("Picture : " + imageUri);
      this.place.picture = imageUri;
     }, (err) => {
      console.log("Error taking picture");
     });
  }
  

}
