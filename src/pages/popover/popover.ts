import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, PopoverController, LoadingController} from 'ionic-angular';
import {IssueProvider, IIssue} from "../../providers/issue/issue";
import {UtilsProvider} from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  issue:IIssue;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public issueProvider: IssueProvider,
              public utils: UtilsProvider,
              public storage:Storage,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController) {
  }

  sendToSprint() {

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Procesando...'
      });
    loading.present();

    this.issue = this.viewCtrl.getNavParams().get("issue");

    this.storage.get("projectId")
      .then((idProject)=>{
        this.issue.idProject = idProject;
        this.issueProvider.sendIssueToActiveSprint(this.issue)
          .subscribe( (i:IIssue) =>{
            loading.dismiss();
            this.viewCtrl.dismiss();
            this.utils.presentToast(`Se envió el issue SID-${i.id} al sprint`);
          });       
      })
  }

  delete() {

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Procesando...'
      });
    loading.present();

    this.issue = this.viewCtrl.getNavParams().get("issue");
    this.issueProvider.deleteIssue(this.issue.id)
    .subscribe( (i:IIssue) =>{
      loading.dismiss();
      this.viewCtrl.dismiss();
      this.utils.presentToast(`Se eliminó el issue SID-${i.id}`);
    });
  }

}
