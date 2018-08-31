import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public issueProvider: IssueProvider) {
  }

  ionViewDidLoad() { }

  sendToSprint() {
    this.issueProvider.addIssueInActiveSprint(this.viewCtrl.getNavParams().get("id"))
      .subscribe( data =>{

      });

    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
