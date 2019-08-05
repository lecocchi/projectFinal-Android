import { Component } from '@angular/core';
import { LoadingController, NavController, PopoverController } from 'ionic-angular';
import { IssuePage } from "../issue/issue";
import { IssueProvider, IIssue } from "../../providers/issue/issue";
import { PopoverPage } from "../popover/popover";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

  issues: any = [];
  avatar: string = 'https://picsum.photos/300/300?image=0';
  issuePage: any;
  projectName: string;
  classState: string;

  constructor(public navCtrl: NavController,
    public issueProvider: IssueProvider,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public storage: Storage) {
    this.issuePage = IssuePage;
  }


  ionViewDidEnter() {
    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Cargando...'
      });
    loading.present();



    this.storage.get("projectName")
      .then(p => {
        this.projectName = p;

        this.storage.get("projectId")
          .then((projectId: any) => {
            this.issueProvider.getAllIssueBacklog(projectId)
              .subscribe((data: any) => {
                this.issues = data;
                loading.dismiss();
              });
          });
      });
  }

  openDetail(issue: IIssue) {
    this.navCtrl.push(IssuePage, { "issue": issue, "update": true });
  }

  createNewIssue() {
    this.navCtrl.push(IssuePage, { "issue": null, "update": false, "backlog": true });
  }

  presentPopover(myEvent, issue: IIssue) {

    this.storage.get("projectId")
      .then(idProject => {
        issue.idProject = idProject;
        let popover = this.popoverCtrl.create(PopoverPage, { 'issue': issue });

        popover.onDidDismiss(() => {
          let loading = this.loadingCtrl.create(
            {
              spinner: 'ios',
              content: 'Cargando...'
            });
          loading.present();

          this.storage.get("projectId")
            .then(idProject => {
              this.issueProvider.getAllIssueBacklog(idProject)
                .subscribe((data: any) => {
                  this.issues = data;
                  loading.dismiss();
                });
            });
        });

        popover.present({
          ev: myEvent
        });
      });
  }

  public getClassByState(state: string) {
    switch (state) {
      case 'CREADO':
        return 'created';

      case 'EN PROGRESO':
        return 'progress'

      case 'BLOQUEADO':
        return 'blocked';

      case 'FINALIZADO':
        return 'finished';

      default:
        break;
    }
  }

}
