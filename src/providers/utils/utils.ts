import { Injectable } from '@angular/core';
import {ToastController, AlertController} from "ionic-angular";

@Injectable()
export class UtilsProvider {

  days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  constructor( public toastCtrl: ToastController, public alertCtrl:AlertController) { }

  isEmpty(object:any):boolean{
    return object === undefined || object == "";
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500
    });
    toast.present();
  }

  traslatorLenguajeSpanish(date:any){
    return {
      "day":date.dayOfMonth,
      "month": this.months[date.monthValue - 1],
      "year": date.year,
      "dayWeek": date.dayOfWeek
    }
  }

  presentPrompt(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{text: 'Aceptar'}
      ]
    });
    alert.present();
  }


  public getDayInSpanish(day:string): string{
    switch (day){
      case "MONDAY":{
        return "Lunes"
      }

      case "TUESDAY":{
        return "Martes"
      }

      case "WEDNESDAY":{
        return "Miércoles"
      }

      case "THURSDAY": {
        return "Jueves"
      }

      case "FRIDAY": {
        return "Viernes"
      }

      case "SATURDAY": {
        return "Sábado"
      }

      case "SUNDAY": {
        return "Domingo"
      }
    }
  }

}
