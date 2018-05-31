import { Injectable } from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class UtilsProvider {

  constructor( public toastCtrl: ToastController) { }

  isEmpty(object:any):boolean{
    return object === undefined || object == "";
  }

    presentToast(message:string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }

}
