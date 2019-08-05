import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { StateProvider } from "../../providers/state/state";

/**
 * Generated class for the LabelDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-state-description',
  templateUrl: 'state-description.html',
})
export class StateDescriptionPage {

  title: string = 'Crear una nuevo estado';
  state: any;
  id: number;
  name: string;
  description: string;
  readonly: boolean = false;
  update: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stateProvider: StateProvider,
    public toastCtrl: ToastController, public utils: UtilsProvider) {

    this.update = this.navParams.get('update')

    if (this.update == true) {
      this.state = this.navParams.get('rol');
      this.id = this.state.id;
      this.name = this.state.name;
      this.description = this.state.description;
      this.title = `Editar estado ${this.name}`;
      this.readonly = true;
    }
  }

  accept() {

    if (this.utils.isEmpty(this.name)) {
      this.presentToast('El nombre no puede estar vacío');
    } else if (this.utils.isEmpty(this.description)) {
      this.presentToast('La descripción no puede estar vacía');
    } else {
      if (this.update) {
        this.stateProvider.updateState(this.id, this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se modificó el estado con éxito`);
            }
          );

      } else {
        this.stateProvider.createNewState(this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se creó el estado con éxito`);
            }
          );
      }
    }
  }


  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
