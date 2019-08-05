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
  sprint: any;
  isActive: boolean;
  isCreate: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public sprintProvider: SprintProvider,
    public utils: UtilsProvider,
    public utilProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public issueProvider: IssueProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
  }


  ionViewWillEnter() {
    this.sprint = this.navParams.get("sprint");
    this.isActive = this.sprint.isActive;
    this.isCreate = this.sprint.isCreate;

  }


  finish() {
    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();

    this.storage.get("projectId")
      .then(idProject => {
        this.issueProvider.getAllIssueOpenInActiveSprint(idProject)
          .subscribe((is: any) => {
            this.issues = is;

            let canFinished = this.issues.some((i: any) => {
              return (i.state === 'BLOQUEADO' || i.state === 'EN PROGRESO')
            })

            if (canFinished) {
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Finalizar Sprint',
                subTitle: "Para poder finalizar el sprint es necesario que no existan issues con estado 'EN PROGRESO' o 'BLOQUEADO'.",
                buttons: [
                  {
                    text: 'Aceptar',
                    cssClass: 'btn-alert-ok',
                    handler: () => {
                      this.viewCtrl.dismiss();
                    }
                  },
                ]
              });
              alert.present();
            } else {
              if (this.issues.length > 0) {
                let alert = this.alertCtrl.create({
                  title: 'Finalizar Sprint',
                  subTitle: "Existen issues con estado 'CREADO' que se van a enviar al backlog.\n¿Desea cerrar el sprint?",
                  buttons: [
                    {
                      text: 'Aceptar',
                      cssClass: 'btn-alert-ok',
                      handler: () => {
                        this.sprintProvider.finishSprint(this.viewCtrl.getNavParams().get("sprint"))
                          .subscribe((i: any) => {
                            loading.dismiss();
                            this.utils.presentToast(`Se finalizó el Sprint`);
                            this.viewCtrl.dismiss();
                          },
                            (err) => {
                              loading.dismiss();
                              this.utilProvider.presentPrompt(err.error.title, err.error.message);
                            }
                          );
                      }
                    },
                    {
                      text: 'Cancelar',
                      cssClass: 'btn-alert-cancel',
                      role: 'Cancel',
                      handler: () => {
                        this.viewCtrl.dismiss();
                        loading.dismiss();
                      }
                    }
                  ]
                });
                alert.present();
              } else {
                this.sprintProvider.finishSprint(this.viewCtrl.getNavParams().get("sprint"))
                  .subscribe((i: any) => {
                    loading.dismiss();
                    this.utils.presentToast(`Se finalizó el Sprint`);
                    this.viewCtrl.dismiss();
                  },
                    (err) => {
                      loading.dismiss();
                      this.utilProvider.presentPrompt(err.error.title, err.error.message);
                    });
              }
            }
          },
            (err) => {
              loading.dismiss();
              this.utils.presentPrompt('Error', 'Se produjo un error al intentar obtener los issues abiertos para el sprint');
            }
          );
      });
  }

  activated() {

    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();

    this.sprintProvider.activedSprint(this.sprint)
      .subscribe((s: any) => {
        loading.dismiss();
        this.viewCtrl.dismiss();
        this.utilProvider.presentToast("Se activó el sprint de forma exitosa");
      },
        (err) => {
          loading.dismiss();
          this.viewCtrl.dismiss();
          this.utilProvider.presentPrompt(err.error.title, err.error.message);
        });

  }
}
