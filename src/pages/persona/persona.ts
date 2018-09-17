import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";

@Component({
  selector: 'page-persona',
  templateUrl: 'persona.html',
})
export class PersonaPage {
  reporter:string;
  assignee:string;
  assignees:any = [];
  issueActive:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public issueProvider:IssueProvider,
              public alertCtrl:AlertController) {
    this.reporter = this.issueProvider.issue.reporter;
    this.assignee = this.issueProvider.issue.assignee;
    this.issueActive = (this.issueProvider.issue.state == 'Finalizado') ? false : true;

    this.assignees = [
      {
        type: 'radio',
        value: 'Leandro Cocchi',
        label: 'Leandro Cocchi'
      },
      {
        type: 'radio',
        value: 'Julieta Medved',
        label: 'Julieta Medved'
      },
      {
        type: 'radio',
        value: 'Lucas Lando',
        label: 'Lucas Lando'
      },
      {
        type: 'radio',
        value: 'Uriel Bonano',
        label: 'Uriel Bonano'
      },{
        type: 'radio',
        value: 'Nicolas Molina',
        label: 'Nicolas Molina'
      }
    ];

  }

  selectAssignee(){
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
