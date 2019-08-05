import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { PrioritiesProvider } from "../../providers/priority/priority";

@Component({
  selector: 'page-priority-description',
  templateUrl: 'priority-description.html',
})
export class PriorityDescriptionPage {

  title: string = 'Crear una nueva prioridad';
  priority: any;
  id: number;
  name: string;
  description: string;
  readonly: boolean = false;
  update: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public priorityProvider: PrioritiesProvider,
    public toastCtrl: ToastController, public utils: UtilsProvider) {

    this.update = this.navParams.get('update')

    if (this.update == true) {
      this.priority = this.navParams.get('priority');
      this.id = this.priority.id;
      this.name = this.priority.name;
      this.description = this.priority.description;
      this.title = `Editar prioridad ${this.name}`;
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
        this.priorityProvider.updatePriority(this.id, this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se modificó la prioridad con éxito`);
            }
          );

      } else {
        this.priorityProvider.createNewPriority(this.name, this.description)
          .subscribe(
            (data) => {
              this.navCtrl.pop();
              this.presentToast(`Se creó la prioridad con éxito`);
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
