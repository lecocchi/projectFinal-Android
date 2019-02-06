import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { UtilsProvider } from '../../providers/utils/utils';


@Component({
  selector: 'page-popover-backlog',
  templateUrl: 'popover-backlog.html',
})
export class PopoverBacklogPage {
  issue:IIssue;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public issueProvider: IssueProvider,
    public viewCtrl: ViewController,
    public utils: UtilsProvider) {
  }

  sendToBacklog() {
    this.issue = this.viewCtrl.getNavParams().get("issue");
    this.issueProvider.addIssueInBacklog(this.issue)
      .subscribe( (i:IIssue) =>{
        this.utils.presentToast(`Se envió el issue SID-${i.id} al Backlog`);
      });

    this.viewCtrl.dismiss();
  }

  delete() {
    this.issue = this.viewCtrl.getNavParams().get("issue");
    this.issueProvider.deleteIssue(this.issue.id)
    .subscribe( (i:IIssue) =>{
      this.utils.presentToast(`Se eliminó el issue SID-${i.id}`);
    });

    this.viewCtrl.dismiss();
  }

}
