import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {IssueProvider, IIssue} from "../../providers/issue/issue";
import {UtilsProvider} from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public issueProvider: IssueProvider,
              public utils: UtilsProvider,
              public storage:Storage) {
  }

  sendToSprint() {

    this.storage.get("projectId")
      .then((idProject)=>{
        this.issueProvider.addIssueInActiveSprintByProject(this.viewCtrl.getNavParams().get("id"), idProject)
        .subscribe( (issue:IIssue) =>{
          this.utils.presentToast(`Se envió el issue SID-${issue.id} al sprint`);
          this.viewCtrl.dismiss();
        },
        (err) => {
          this.utils.presentPrompt(err.error.title, err.error.message);
          this.viewCtrl.dismiss();
        });
      })

  }

  delete() {
    this.issueProvider.deleteIssue(this.viewCtrl.getNavParams().get("id"))
    .subscribe( (i:IIssue) =>{
      this.utils.presentToast(`Se eliminó el issue SID-${i.id}`);
    });

    this.viewCtrl.dismiss();
  }

}
