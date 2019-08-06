import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { SprintProvider } from "../../providers/sprint/sprint";
import { UtilsProvider } from "../../providers/utils/utils";
import { IssuePage } from "../issue/issue";
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { PopoverBacklogPage } from '../popover-backlog/popover-backlog';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprint.html',
})
export class SprintPage {
  from: any;
  to: any;
  name: string;
  description: string;
  readonly: boolean = false;
  create: boolean;
  sprint: Sprint;
  issues: any = [];
  classState: string;
  isCreate: boolean;

  dayFrom: number;
  monthFrom: number;
  yearFrom: number;
  dayTo: number;
  monthTo: number;
  yearTo: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sprintProvider: SprintProvider,
    public utilsProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public issueProvider: IssueProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage) {

    this.sprint = this.navParams.get('sprint');
    this.create = this.navParams.get('create');

    if (this.create) {

    } else {

      this.isCreate = this.sprint.isCreate;

      this.readonly = !this.sprint.isActive && !this.sprint.isCreate;

      this.issueProvider.getIssueBySprintId(this.sprint.id)
        .subscribe(i => {
          this.issues = i;

          this.name = this.sprint.name;
          this.description = this.sprint.description;
          this.from = new Date(this.sprint.dateFrom).toISOString();
          this.to = new Date(this.sprint.dateTo).toISOString();

          this.dayFrom = new Date(this.sprint.dateFrom).getDate();
          this.monthFrom = new Date(this.sprint.dateFrom).getUTCMonth() + 1;
          this.yearFrom = new Date(this.sprint.dateFrom).getFullYear();

          this.dayTo = new Date(this.sprint.dateTo).getDate();
          this.monthTo = new Date(this.sprint.dateTo).getUTCMonth() + 1;
          this.yearTo = new Date(this.sprint.dateTo).getFullYear();

        });
    }
  }

  ionViewDidEnter() {

    if (!this.create) {
      let loading = this.loadingCtrl.create(
        {
          spinner: 'ios',
          content: 'Cargando...'
        });
      loading.present();

      this.issueProvider.getIssueBySprintId(this.sprint.id)
        .subscribe((data: any) => {
          this.issues = data;
          loading.dismiss();
        });
    }
  }


  createSprint() {

    if (this.from == undefined || this.from == null) {
      this.utilsProvider.presentPrompt("Error", "Falta ingresar la fecha 'DESDE' del sprint");
    } else if (this.to == undefined || this.to == null) {
      this.utilsProvider.presentPrompt("Error", "Falta ingresar la fecha 'HASTA' del sprint");
    } else {

      let loading = this.loadingCtrl.create(
        {
          spinner: 'ios',
          content: 'Cargando...'
        });
      loading.present();

      this.storage.get("projectId")
        .then(idProject => {
          let sprint = {
            "name": this.name,
            "description": this.description,
            "date_from": new Date(this.monthFrom + "/" + this.dayFrom + "/" + this.yearFrom).getTime(),
            "date_to": new Date(this.monthTo + "/" + this.dayTo + "/" + this.yearTo).getTime(),
            "id_project": idProject,
            "is_active": false,
            "is_create": true
          }

          this.sprintProvider.createSprint(sprint)
            .subscribe((s: Sprint) => {
              loading.dismiss();
              this.utilsProvider.presentToast("Se ha generado con éxito el Sprint");
              this.cancel();
            },
              (err) => {
                loading.dismiss();
                this.utilsProvider.presentPrompt(err.error.title, err.error.message);
              }
            );
        });
    }
  }

  public validateDateFrom(date: Date) {

    if (date != null) {
      let isValid = true;
      let dateArray: string[] = date.toString().split("-");
      let dateToString = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
      let dateMillisecond = new Date(dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]).getTime();

      this.sprintProvider.sprints.forEach((s: Sprint) => {
        if (dateMillisecond >= s.dateFrom && dateMillisecond <= s.dateTo)
          isValid = false;
      });

      if (!isValid) {
        this.alertCtrl.create({
          title: "Error",
          subTitle: "La fecha " + dateToString + " ya está contenida en otro Sprint",
          buttons: [{
            text: 'Aceptar',
            handler: data => {
              this.from = null;
            }
          }]
        }).present();
      }
    }
  }

  public validateDateTo(date: Date) {

    if (date != null) {

      let isValid = true;
      let dateArray: string[] = date.toString().split("-");
      let dateToString = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
      let dateMillisecond = new Date(dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]).getTime();

      this.sprintProvider.sprints.forEach((s: Sprint) => {
        if (dateMillisecond >= s.dateFrom && dateMillisecond <= s.dateTo)
          isValid = false;
      });

      if (!isValid) {
        this.alertCtrl.create({
          title: "Error",
          subTitle: "La fecha " + dateToString + " ya está contenida en otro Sprint",
          buttons: [{
            text: 'Aceptar',
            handler: data => {
              this.to = null;
            }
          }]
        }).present();
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  openDetail(issue: any) {
    this.navCtrl.push(IssuePage, { "issue": issue, "update": true });
  }

  createNewIssue() {
    this.navCtrl.push(IssuePage, { "issue": null, "update": false, "backlog": false, "sprint": this.sprint });
  }

  presentPopover(myEvent, issue: IIssue) {
    let popover = this.popoverCtrl.create(PopoverBacklogPage, { 'issue': issue, "sprint": this.sprint });

    popover.onDidDismiss(() => {
      let loading = this.loadingCtrl.create(
        {
          spinner: 'ios',
          content: 'Cargando...'
        });
      loading.present();

      this.issueProvider.getIssueBySprintId(this.sprint.id)
        .subscribe(data => {
          this.issues = data;
          loading.dismiss();
        });
    });

    popover.present({
      ev: myEvent
    });
  }

  public getClassByState(state: string) {
    switch (state) {
      case 'CREADO':
        return 'created';

      case 'EN PROGRESO':
        return 'progress';

      case 'BLOQUEADO':
        return 'blocked';

      case 'FINALIZADO':
        return 'finished';

      default:
        break;
    }
  }

  changeDateFrom($event) {
    this.dayFrom = $event.day;
    this.monthFrom = $event.month;
    this.yearFrom = $event.year;
  }

  changeDateTo($event) {
    this.dayTo = $event.day;
    this.monthTo = $event.month;
    this.yearTo = $event.year;
  }
}



interface Sprint {
  id: number;
  name: string;
  created: number;
  dateFrom: number;
  dateTo: number;
  description: string;
  enabled: boolean;
  isActive: boolean;
  isCreate: boolean;
}
