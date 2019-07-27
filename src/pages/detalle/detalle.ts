import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StateProvider } from "../../providers/state/state";
import { PrioritiesProvider } from "../../providers/priority/priority";
import { VersionsProvider } from "../../providers/versions/versions";
import { IssueProvider } from "../../providers/issue/issue";
import { Storage } from '@ionic/storage';


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
  estimated:number;
  estimatedList:any = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public stateProvider: StateProvider, public priorityProvider: PrioritiesProvider,
              public versionProvider: VersionsProvider, public alertCtrl: AlertController,
              public issueProvider: IssueProvider,
              public loadingCtrl:LoadingController,
              public storage:Storage) {


    this.update = this.navParams.data;

    if (this.update) {

      let loading = this.loadingCtrl.create(
        { spinner: 'ios',
          content:'Cargando...'
        });
      loading.present();

      this.issueProvider.issueToUpdate = this.issueProvider.issue;
      this.title = this.issueProvider.issue.title;
      this.description = this.issueProvider.issue.description;
      this.state = this.issueProvider.issue.state;
      this.priority = this.issueProvider.issue.priority;
      this.version = this.issueProvider.issue.version;
      this.estimated = this.issueProvider.issue.estimated;

      this.issueInactive = this.issueProvider.issue.state === 'FINALIZADO' ? true : false;
      this.disabledState = this.issueInactive || this.issueProvider.issue.backlog;

      loading.dismiss();

    } else {
      this.issueInactive = false;
      this.state = 'CREADO';
      this.issueProvider.issue.state = this.state;
      this.disabledState = this.issueProvider.issue.backlog;
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
    this.storage.get("projectId")
      .then(idProject =>{
        this.versionProvider.getAllVersion(idProject)
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
      });
  }


  onChangePriority($event){
    if(this.update)
      this.issueProvider.issueToUpdate.priority = $event;
    else
      this.issueProvider.issue.priority = $event;
  }

  onChangeState($event){    
    if(this.update)
      this.issueProvider.issueToUpdate.state = $event;
    else
      this.issueProvider.issue.state = $event;
  }

  onChangeVersion($event){
    if(this.update)
      this.issueProvider.issueToUpdate.version = $event;
    else
      this.issueProvider.issue.version = $event;
  }

  changeTitle($event){
    if(this.update)
      this.issueProvider.issue.title = $event.value;
    else
      this.issueProvider.issue.title = $event.value;
  }

  changeDescription($event){
    if(this.update)
      this.issueProvider.issue.description = $event.value;
    else
      this.issueProvider.issue.description = $event.value;
  }

  onChangeEstimated($event){
    if(this.update)
      this.issueProvider.issue.estimated = $event;
    else
      this.issueProvider.issue.estimated = $event;
  }


}
