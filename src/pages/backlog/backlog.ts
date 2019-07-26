import {Component} from '@angular/core';
import {LoadingController, NavController, PopoverController} from 'ionic-angular';
import {IssuePage} from "../issue/issue";
import {IssueProvider, IIssue} from "../../providers/issue/issue";
import {PopoverPage} from "../popover/popover";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

  issues:any = [];
  avatar:string = 'https://picsum.photos/300/300?image=0';
  issuePage:any;

  constructor(public navCtrl: NavController, 
    public issueProvider: IssueProvider, 
    public loadingCtrl:LoadingController, 
    public popoverCtrl: PopoverController,
    public storage:Storage) {
    this.issuePage = IssuePage;
  }


  ionViewDidEnter(){
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.storage.get("projectId")
      .then((projectId:any)=>{
        this.issueProvider.getAllIssueBacklog(projectId)
          .subscribe(data =>{
            this.issues = data;
            loading.dismiss();
          });
      });
  }

  openDetail(issue:IIssue){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true});
  }

  createNewIssue(){
    // this.issueProvider.issue.reporter = 'Leandro Sebastian Cocchi';
    this.navCtrl.push(IssuePage, {"issue":null, "update": false, "backlog": true});
  }

  presentPopover(myEvent, issue:IIssue) {

    this.storage.get("projectId")
      .then(idProject =>{
        issue.idProject = idProject;
        let popover = this.popoverCtrl.create(PopoverPage, {'issue':issue});

        popover.onDidDismiss(() => {
          let loading = this.loadingCtrl.create(
            { spinner: 'ios',
              content:'Cargando...'
            });
          loading.present();

          this.storage.get("projectId")
            .then(idProject => {
              this.issueProvider.getAllIssueBacklog(idProject)
                .subscribe(data =>{
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

}
