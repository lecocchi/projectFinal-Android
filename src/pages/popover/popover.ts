import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";
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

  ionViewDidLoad() { }

  sendToSprint() {
    this.issueProvider.addIssueInActiveSprint(this.viewCtrl.getNavParams().get("id"))
      .subscribe( i =>{
        this.utils.presentToast(`Se envió el issue SID-${i.id} al sprint`);
      });

    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
