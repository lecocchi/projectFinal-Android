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
  issueInactive: boolean;
  update: boolean;
  title: string = "";
  description: string;
  disabledState: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public stateProvider: StateProvider, public priorityProvider: PrioritiesProvider,
    public versionProvider: VersionsProvider, public alertCtrl: AlertController,
    public issueProvider: IssueProvider) {

    this.update = this.navParams.data;

    if (this.update) {
      this.issueInactive = (this.issueProvider.issue.state === 'FINALIZADO') ? true : false;

      this.disabledState = this.issueInactive || this.issueProvider.issue.backlog;

      this.issueProvider.issueToUpdate = this.issueProvider.issue;
      this.title = this.issueProvider.issue.title;
      this.description = this.issueProvider.issue.description;
      this.state = this.issueProvider.issue.state;
      this.priority = this.issueProvider.issue.priority;
      this.version = this.issueProvider.issue.version;
    } else {
      this.issueInactive = false;
      this.state = 'CREADO';
      this.issueProvider.issue.state = this.state;
      this.disabledState = true;
    }

    //STATES
    this.stateProvider.getAllState()
      .subscribe((s: any) => {
        s.forEach(state => {
          this.states.push({
            value: state.name
          })
        })
      });

    //PRIORITY
    this.priorityProvider.getAllPriority()
      .subscribe((p: any) => {
        this.priorities.push({
          value: 'Sin prioridad'
        });
        p.forEach(pri => {
          this.priorities.push({
            value: pri.name
          });
        })
      });

    //VERSION
    this.versionProvider.getAllVersion()
      .subscribe((v: any) => {
        this.versions.push({
          value: 'Sin versión'
        });
        v.forEach(ve => {
          this.versions.push({
            value: ve.name
          });
        })
      });
  }


  onChangePriority($event){
    this.issueProvider.issueToUpdate.priority = $event;
  }

  onChangeState($event){
    this.issueProvider.issueToUpdate.state = $event;
  }

  onChangeVersion($event){
    this.issueProvider.issueToUpdate.version = $event;
  }

  changeTitle($event){
    this.issueProvider.issue.title = $event.value;
  }

  changeDescription($event){
    this.issueProvider.issue.description = $event.value;
  }


}
