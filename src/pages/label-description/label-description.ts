import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { LabelProvider } from "../../providers/label/label";

/**
 * Generated class for the LabelDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-label-description',
  templateUrl: 'label-description.html',
})
export class LabelDescriptionPage {

  title: string = 'Crear una nueva etiqueta';
  label: any;
  id: number;
  name: string;
  description: string;
  readonly: boolean = false;
  update: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public labelProvider: LabelProvider,
    public toastCtrl: ToastController, public utils: UtilsProvider) {

    this.update = this.navParams.get('update')

    if (this.update == true) {
      this.label = this.navParams.get('version');
      this.id = this.label.id;
      this.name = this.label.name;
      this.description = this.label.description;
      this.title = `Editar etiqueta ${this.name}`;
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
        this.labelProvider.updateLabel(this.id, this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se modificó la etiqueta con éxito`);
            }
          );

      } else {
        this.labelProvider.createNewLabel(this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se creó la etiqueta con éxito`);
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
