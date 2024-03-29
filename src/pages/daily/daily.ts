import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { DailyItemPage } from "../daily-item/daily-item";
import { DailyProvider } from "../../providers/daily/daily";
import { UtilsProvider } from "../../providers/utils/utils";
import { SprintProvider } from '../../providers/sprint/sprint';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-daily-tab',
  templateUrl: 'daily.html'
})
export class DailyPage {

  dailyItemPage: any = DailyItemPage;
  dailies: any = [];
  activeSprint: number;
  firstName: String;
  lastName: String;
  userName: String;
  dateTo: any;
  dateFrom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dailyProvider: DailyProvider, public utils: UtilsProvider,
    public loadingCtrl: LoadingController,
    public sprintProvider: SprintProvider,
    private storage: Storage) { }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...'
    });

    loading.present();


    this.storage.get("projectId")
      .then(idProject => {
        this.dailyProvider.getAllDailiesByProject(idProject)
          .subscribe((data: any) => {
            loading.dismiss();
            this.dailies = data.reverse();
            this.dailies.forEach(d => {
              d.created_at.dayOfWeek = this.utils.getDayInSpanish(d.created_at.dayOfWeek);

              this.sprintProvider.getSprintByNameAndProject(d.sprint, idProject)
                .subscribe((s: any) => {
                  this.dateFrom = s.dateFrom;
                  this.dateTo = s.dateTo;
                },
                  (err) => {
                    loading.dismiss();
                    this.utils.presentPrompt("Error", "Error al obtener las dailies")
                  })
            }),
              (err) => {
                loading.dismiss();
                this.utils.presentPrompt("Error", "Error al obtener las dailies")
              };
          });
      })
  }

  createNewDaily() {

    this.storage.get("projectId")
      .then((idProject) => {
        this.sprintProvider.sprintActive(idProject)
          .subscribe((s: any) => {
            this.activeSprint = s.name;

            this.dailyProvider.isThereDailyToday(idProject)
              .subscribe(isThereDaily => {
                if (isThereDaily) {
                  this.utils.presentToast("Ya existe una daily activa para el día de hoy");
                } else {

                  this.storage.get("firstName").then(f => {
                    this.firstName = f;
                    this.storage.get("lastName").then(l => {
                      this.lastName = l;
                      this.storage.get("userName").then(u => {
                        this.userName = u;
                        let daily: any = {
                          "firstName": this.firstName,
                          "lastName": this.lastName,
                          "userName": this.userName,
                          "daily_items": [],
                          "sprint": s.name,
                          "id_project": idProject
                        }
                        this.dailyProvider.daily = daily;
                        this.navCtrl.push(this.dailyItemPage);
                      });
                    });
                  });
                }
              });
          },
            (err) => {
              this.utils.presentPrompt("ERROR", "Para crear una daily tiene que existir un Sprint Activo");
              // this.utils.presentPrompt(err.error.title, err.error.message);
            });
      }
      )
  }

  openDetail(daily: any) {
    this.dailyProvider.daily = daily;
    this.navCtrl.push(this.dailyItemPage);
  }

  sendMail(dailyId: string) {

    this.utils.presentToast("Enviando mails .......");

    this.dailyProvider.sendMail(dailyId)
      .subscribe((m) => {
        this.utils.presentToast("Se han enviado los mails correctamente");
      },
        (err) => {
          this.utils.presentPrompt("Error", "Error al enviar los mails");
        });
  }

}
