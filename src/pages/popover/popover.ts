import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {IssueProvider, IIssue} from "../../providers/issue/issue";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public issueProvider: IssueProvider,
              public utils: UtilsProvider) {
  }

  sendToSprint() {
    this.issueProvider.addIssueInActiveSprint(this.viewCtrl.getNavParams().get("id"))
      .subscribe( i =>{
        this.utils.presentToast(`Se envió el issue SID-${i.id} al sprint`);
      });

    this.viewCtrl.dismiss();
  }

  delete() {
    this.issueProvider.deleteIssue(this.viewCtrl.getNavParams().get("id"))
    .subscribe( (i:IIssue) =>{
      this.utils.presentToast(`Se eliminó el issue SID-${i.id}`);
    });

    this.viewCtrl.dismiss();
  }

}
