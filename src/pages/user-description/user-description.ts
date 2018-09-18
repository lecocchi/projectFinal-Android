import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {LoadFileProvider} from "../../providers/load-file/load-file";

@Component({
  selector: 'page-user-description',
  templateUrl: 'user-description.html',
})
export class UserDescriptionPage {

  firstName:string;
  lastName:string;
  dni:number;
  email:string;
  fullName:string;
  avatar:string;
  mode:string;
  imagePreview: string;
  image64: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,
              private _loadFile: LoadFileProvider) {

    this.mode = this.navParams.get('mode');

    if (this.mode === 'detail'){
      this.firstName = this.navParams.get('firstName');
      this.lastName = this.navParams.get('lastName');
      this.dni = this.navParams.get('dni');
      this.email = this.navParams.get('email');
      this.fullName = this.firstName + ' ' + this.lastName;
      this.avatar = this.navParams.get('avatar');
    } else if (this.mode === 'create'){

    }

  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true
    }
    this.camera.getPicture( options )
      .then(imageData => {
        this.imagePreview = `data:image/jpeg;base64,${imageData}`;
        this.image64 = imageData;
        this.loadImage();
      })
      .catch(error =>{
        console.error( error );
      });
  }

  loadImage(){
    let file = {
      imgUrl: this.image64
    }

    this._loadFile.loadFileFirebase(file);
  }

}
