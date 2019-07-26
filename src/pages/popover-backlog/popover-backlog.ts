import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-popover-backlog',
  templateUrl: 'popover-backlog.html',
})
export class PopoverBacklogPage {
  issue:IIssue;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public issueProvider: IssueProvider,
    public viewCtrl: ViewController,
    public utils: UtilsProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController) {
  }

  sendToBacklog() {

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Procesando...'
      });
    loading.present();

    this.issue = this.viewCtrl.getNavParams().get("issue");

    this.storage.get("projectId")
      .then((idProject)=>{
        this.issue.idProject = idProject;
        this.issueProvider.addIssueInBacklog(this.issue)
          .subscribe( (i:IIssue) =>{
            this.viewCtrl.dismiss();
            loading.dismiss();
            this.utils.presentToast(`Se envió el issue SID-${i.id} al Backlog`);
            
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
