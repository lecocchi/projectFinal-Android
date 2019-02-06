import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ToastController} from "ionic-angular";

@Injectable()
export class LoadFileProvider {

  constructor(public http: HttpClient, private toastCtrl : ToastController) {
    console.log('Hello LoadFileProvider Provider');
  }

  loadFileFirebase(file: File){
    return new Promise( (resolve, reject) => {
      this.showToast('Cargando...');
      let storageRef = firebase.storage().ref();
      let fileName: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
        storageRef .child(`img/${fileName}`)
          .putString(file.imgUrl, 'base64', {contentType: 'image/jpeg'})

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,

        ()=>{}, //saber el % de cuantos Mbs se ha subido
        (error)=>{
          console.log("Error en la carga");
          console.log(JSON.stringify(error));
          this.showToast(JSON.stringify(error));
          reject();
        },

      ()=>{
        console.log('Archivo subido');
        this.showToast('Imagen cargada correctamente');
        resolve();
      }
      )
    })


  }

  showToast(mensage: string){
    this.toastCtrl.create({
      message: mensage,
      duration: 2000
    }).present();
  }

}

interface File {
  title?:string;
  imgUrl:string;
  key?: string;
}
