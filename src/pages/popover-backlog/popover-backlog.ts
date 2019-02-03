import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { UtilsProvider } from '../../providers/utils/utils';


@Component({
  selector: 'page-popover-backlog',
  templateUrl: 'popover-backlog.html',
})
export class PopoverBacklogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public issueProvider: IssueProvider,
    public viewCtrl: ViewController,
    public utils: UtilsProvider) {
  }

  sendToBacklog() {
    this.issueProvider.addIssueInBacklog(this.viewCtrl.getNavParams().get("issue"))
      .subscribe( (i:IIssue) =>{
        this.utils.presentToast(`Se envió el issue SID-${i.id} al Backlog`);
      });

    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
