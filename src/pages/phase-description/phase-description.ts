import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {PhaseProvider} from "../../providers/phase/phase";

/**
 * Generated class for the LabelDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phase-description',
  templateUrl: 'phase-description.html',
})
export class PhaseDescriptionPage {

  title:string = 'Crear una nueva fase';
  phase:any;
  id:number;
  name:string;
  description:string;
  readonly:boolean = false;
  update:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public phaseProvider: PhaseProvider,
              public toastCtrl: ToastController, public utils:UtilsProvider) {

    this.update = this.navParams.get('update')

    if( this.update == true){
      this.phase = this.navParams.get('phase');
      this.id = this.phase.id;
      this.name = this.phase.name;
      this.description = this.phase.description;
      this.title = `Editar etiqueta ${this.name}`;
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
        this.phaseProvider.updatePhase(this.id, this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se modificó la fase ${this.name} con éxito`);
            }
          );

      } else {
        this.phaseProvider.createNewPhase(this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se creó la fase ${this.name} con éxito`);
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
