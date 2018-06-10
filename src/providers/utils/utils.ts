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

    traslatorLenguajeSpanish(date:Date){

      let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
      let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      return {
          "day":date.getDate(),
          "month": months[date.getMonth()],
          "year": date.getFullYear(),
          "dayWeek": days[date.getDay()]
      }
    }

}
