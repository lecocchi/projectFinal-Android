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
  issueActive: boolean;
  update: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public issueProvider: IssueProvider,
    public alertCtrl: AlertController, public userProvider: UserProvider) {

    this.update = this.navParams.data;

    if (this.update) {
      this.reporter = this.issueProvider.issue.reporter;
      this.assignee = this.issueProvider.issue.assignee;
      this.issueActive = (this.issueProvider.issue.state == 'Finalizado') ? false : true;
    } else {
      this.issueActive = true;
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

  selectAssignee() {
    if (this.issueActive) {
      this.alertCtrl.create({
        title: 'Asignar a',
        inputs: this.assignees,
        buttons: [{
          text: 'Seleccionar',
          handler: assignee => {
            this.assignee = assignee;
            this.issueProvider.issueToUpdate.assignee = assignee;
          }
        }]
      }).present();
    }
  }
}
