import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {RolProvider} from "../../providers/rol/rol";

/**
 * Generated class for the LabelDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rol-description',
  templateUrl: 'rol-description.html',
})
export class RolDescriptionPage {

  title:string = 'Crear una nuevo rol';
  rol:any;
  id:number;
  name:string;
  description:string;
  readonly:boolean = false;
  update:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rolProvider: RolProvider,
              public toastCtrl: ToastController, public utils:UtilsProvider) {

    this.update = this.navParams.get('update')

    if( this.update == true){
      this.rol = this.navParams.get('rol');
      this.id = this.rol.id;
      this.name = this.rol.name;
      this.description = this.rol.description;
      this.title = `Editar rol ${this.name}`;
      this.readonly = true;
    }
  }

  accept(){

    if (this.utils.isEmpty(this.name)){
      this.presentToast('El nombre no puede estar vacío');
    }else if (this.utils.isEmpty(this.description)){
      this.presentToast('La descripción no puede estar vacía');
    }else {
      if (this.update){
        this.rolProvider.updateRol(this.id, this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se modificó el rol ${this.name} con éxito`);
            }
          );

      } else {
        this.rolProvider.createNewRol(this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se creó el rol ${this.name} con éxito`);
            }
          );
      }
    }
  }


  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
