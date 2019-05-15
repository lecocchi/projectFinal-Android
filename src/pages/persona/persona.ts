import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { IssueProvider } from "../../providers/issue/issue";
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-persona',
  templateUrl: 'persona.html',
})
export class PersonaPage {
  reporter: string;
  assignee: string;
  assignees: any = [];
  issueInactive: boolean;
  update: boolean;
  firstName:string;
  lastName:string;
  disabledAssignee:boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public issueProvider: IssueProvider,
              public alertCtrl: AlertController, 
              public userProvider: UserProvider){

    this.update = this.navParams.data;

    if (this.update) {
      this.reporter = this.issueProvider.issue.reporter;
      this.assignee = this.issueProvider.issue.assignee;
      this.issueInactive = (this.issueProvider.issue.state === 'FINALIZADO') ? true : false;
      this.disabledAssignee = this.issueInactive || this.issueProvider.issue.backlog;
    } else {
      this.issueInactive = false;
      this.disabledAssignee = this.issueProvider.issue.backlog;
    }

    this.userProvider.getAllUser()
      .subscribe((u: any) => {
        u.forEach(us => {
          this.assignees.push(
            {
              type: 'radio',
              value: us.firstName + " " + us.lastName,
              label: us.firstName + " " + us.lastName,
            }
          );
        });
      });
  }

  ionViewDidEnter(){
    this.reporter =  this.issueProvider.issue.reporter;
  }

  onChangeAssignee($event){
    this.issueProvider.issueToUpdate.assignee = $event;
  }
}
