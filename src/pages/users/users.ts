import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDescriptionPage} from "../user-description/user-description";
import {Observable} from "rxjs";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {LoadFileProvider} from "../../providers/load-file/load-file";


@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  userDescriptionPage:any = UserDescriptionPage;
  users: Observable<any[]>;
  imagePreview: string;
  image64: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              private imagePicker: ImagePicker, private _loadFile: LoadFileProvider) {
  }

  openDetail(user:any){
    this.navCtrl.push(this.userDescriptionPage, {
      'firstName':user.firstName,
      'lastName':user.lastName,
      'dni':user.dni,
      'email':user.email,
      'userName': user.userName,
      'rol':user.rol,
      'avatar':user.avatar,
      'mode': 'detail'
    } );
  }


  createUser(){
    this.navCtrl.push(this.userDescriptionPage,{mode: 'create'});
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
      })
      .catch(error =>{
        console.error( error );
      });
  }

  choosePicture(){

    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagePreview = `data:image/jpeg;base64,${results[i]}`;
        this.image64 = results[i];
      }
    }, (err) => {
      console.log("ERROR en selector", JSON.stringify(err));
    });
  }

  loadImage(){
    let file = {
      title: 'Ejemplo',
      imgUrl: this.image64
    }

    this._loadFile.loadFileFirebase(file);
  }

}
