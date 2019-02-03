import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { StateProvider } from "../../providers/state/state";
import { PrioritiesProvider } from "../../providers/priority/priority";
import { VersionsProvider } from "../../providers/versions/versions";
import { IssueProvider } from "../../providers/issue/issue";


@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  states: any = [];
  priorities: any = [];
  versions: any = [];
  state: string;
  priority: string;
  version: string;
  issueActive: boolean;
  update: boolean;
  title: string = "";
  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public stateProvider: StateProvider, public priorityProvider: PrioritiesProvider,
    public versionProvider: VersionsProvider, public alertCtrl: AlertController,
    public issueProvider: IssueProvider,
  ) {

    this.update = this.navParams.data;

    if (this.update) {
      this.issueActive = (this.issueProvider.issue.state == 'Finalizado') ? false : true;

      this.issueProvider.issueToUpdate = this.issueProvider.issue;
      this.title = this.issueProvider.issue.title;
      this.description = this.issueProvider.issue.description;
      this.state = this.issueProvider.issue.state;
      this.priority = this.issueProvider.issue.priority;
      this.version = this.issueProvider.issue.version;
    } else {
      this.issueActive = true;
    }

    //STATES
    this.stateProvider.getAllState()
      .subscribe((s: any) => {
        this.states.push({
          type: 'radio',
          label: 'Sin estado',
          value: ''
        });
        s.forEach(state => {
          this.states.push({
            type: 'radio',
            label: state.name,
            value: state.name
          })
        })
      });

    //PRIORITY
    this.priorityProvider.getAllPriority()
      .subscribe((p: any) => {
        this.priorities.push({
          type: 'radio',
          label: 'Sin prioridad',
          value: ''
        });
        p.forEach(pri => {
          this.priorities.push({
            type: 'radio',
            label: pri.name,
            value: pri.name
          });
        })
      });

    //VERSION
    this.versionProvider.getAllVersion()
      .subscribe((v: any) => {
        this.versions.push({
          type: 'radio',
          label: 'Sin versión',
          value: ''
        });
        v.forEach(ve => {
          this.versions.push({
            type: 'radio',
            label: ve.name,
            value: ve.name
          });
        })
      });
  }


  //STATE
  selectState() {
    if (this.issueActive) {
      this.alertCtrl.create({
        title: 'Estados',
        inputs: this.states,
        buttons: [{
          text: 'Seleccionar',
          handler: state => {
            this.state = state;
            this.issueProvider.issueToUpdate.state = state;
          }
        }]
      }).present();
    }
  }

  //PRIORITY
  selectPriority() {
    if (this.issueActive) {
      this.alertCtrl.create({
        title: 'Prioridades',
        inputs: this.priorities,
        buttons: [{
          text: 'Seleccionar',
          handler: priority => {
            this.priority = priority;
            this.issueProvider.issueToUpdate.priority = priority;
          }
        }]
      }).present();
    }
  }

  //VERSION
  selectVersion() {
    if (this.issueActive) {
      this.alertCtrl.create({
        title: 'Versiones',
        inputs: this.versions,
        buttons: [{
          text: 'Seleccionar',
          handler: version => {
            this.version = version;
            (this.update) ? this.issueProvider.issueToUpdate.version = version : this.version = version;
          }
        }]
      }).present();
    }
  }


  changeTitle($event){
    this.issueProvider.issue.title = $event.value;
  }

  changeDescription($event){
    this.issueProvider.issue.description = $event.value;
  }


}
