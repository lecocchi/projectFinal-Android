import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { SprintProvider } from '../../providers/sprint/sprint';
import { IssueProvider } from '../../providers/issue/issue';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover-sprint',
  templateUrl: 'popover-sprint.html',
})
export class PopoverSprintPage {
  issues = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public sprintProvider: SprintProvider,
    public utils: UtilsProvider,
    public utilProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public issueProvider: IssueProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController) {
  }

  finish() {
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Procesando...'
      });
    loading.present();

    this.storage.get("projectId")
      .then(idProject => {
        this.issueProvider.getAllIssueOpenInActiveSprint(idProject)
          .subscribe((is: any) => {
            this.issues = is;
            
            if (this.issues.length > 0) {
              let alert = this.alertCtrl.create({
                title: 'Finalizar Sprint',
                subTitle: 'Existen issues abiertos que se van a enviar al backlog.\n¿Desea cerrar el sprint?',
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.sprintProvider.finishSprint(this.viewCtrl.getNavParams().get("sprint"))
                        .subscribe((i: any) => {
                          loading.dismiss();
                          this.utils.presentToast(`Se finalizó el Sprint ${i.id}`);
                          this.viewCtrl.dismiss();
                        },
                          (err) => {
                            this.utilProvider.presentPrompt(err.error.title, err.error.message);
                          }
                        );
                    }
                  },
                  {
                    text: 'Cancelar',
                    role: 'Cancel',
                    handler: () => {
                      this.viewCtrl.dismiss();
                    }
                  }
                ]
              });
              alert.present();
            }else{
              this.sprintProvider.finishSprint(this.viewCtrl.getNavParams().get("sprint"))
                .subscribe((i: any) => {
                    loading.dismiss();
                    this.utils.presentToast(`Se finalizó el Sprint ${i.id}`);
                    this.viewCtrl.dismiss();
                  },
                  (err) => {
                    loading.dismiss();
                    this.utilProvider.presentPrompt(err.error.title, err.error.message);
                  });
            }
          },
            (err) => {
              loading.dismiss();
              this.utils.presentPrompt('Error', 'Se produjo un error al intentar obtener los issues abiertos para el sprint');
            }
          );
      });
  }
}
