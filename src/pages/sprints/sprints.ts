import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SprintProvider } from "../../providers/sprint/sprint";
import { SprintPage } from "../sprint/sprint";
import { PopoverSprintPage } from '../popover-sprint/popover-sprint';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sprints',
  templateUrl: 'sprints.html',
})
export class SprintsPage {

  sprints: any = [];
  sprintPage: any = SprintPage;
  role: string;
  projectName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sprintProvider: SprintProvider,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public storage: Storage) {

    this.storage.get("rol").then((r) => {
      this.role = r;
    });
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...'
    });

    loading.present();


    this.storage.get("projectName")
      .then(p => {
        this.projectName = p;

        this.storage.get("projectId")
          .then((id) => {
            this.sprintProvider.getAllSprintsByProject(id)
              .subscribe(s => {
                this.sprints = s;
                this.sprints.reverse();
                this.sprintProvider.sprints = s;
                loading.dismiss();
              });
          })
      });
  }

  createSprint() {
    this.sprintProvider.sprintType = 'CREATE';
    this.navCtrl.push(this.sprintPage, { 'sprint': null, 'readonly': false, 'create': true });
  }

  openSprint(sprint: any) {
    if (sprint.isCreate) {
      this.sprintProvider.sprintType = 'CREATE';
    } else if (sprint.isActive) {
      this.sprintProvider.sprintType = 'ACTIVE';
    } else if (!sprint.isActive && !sprint.isCreate) {
      this.sprintProvider.sprintType = 'FINISH';
    }

    this.navCtrl.push(this.sprintPage, { 'sprint': sprint, 'readonly': true, 'create': false });
  }

  presentPopover(myEvent, sprint: any) {

    let popover = this.popoverCtrl.create(PopoverSprintPage, { 'sprint': sprint });

    popover.onDidDismiss(() => {
      let loading = this.loadingCtrl.create(
        {
          spinner: 'ios',
          content: 'Cargando...'
        });
      loading.present();


      this.storage.get("projectId")
        .then((idProject) => {
          this.sprintProvider.getAllSprintsByProject(idProject)
            .subscribe(s => {
              this.sprints = s;
              this.sprints.reverse();
              this.sprintProvider.sprints = s;
              loading.dismiss();
            });
        })
    });

    popover.present({
      ev: myEvent
    });
  }

}
