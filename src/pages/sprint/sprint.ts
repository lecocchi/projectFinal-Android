import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController, LoadingController} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {UtilsProvider} from "../../providers/utils/utils";
import {IssuePage} from "../issue/issue";
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { PopoverBacklogPage } from '../popover-backlog/popover-backlog';

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprint.html',
})
export class SprintPage {
  from:any;
  to:any;
  name:string;
  description:string;
  readonly:boolean = false;
  sprint:Sprint;
  issues:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  sprintProvider:SprintProvider,
              public utilsProvider:UtilsProvider,
              public alertCtrl:AlertController,
              public popoverCtrl: PopoverController,
              public issueProvider: IssueProvider,
              public loadingCtrl: LoadingController) {

    this.sprint = this.navParams.get('sprint');
    this.readonly = this.navParams.get('readonly');

    this.issueProvider.getIssueBySprintId(this.sprint.id)
      .subscribe( i =>{
        this.issues = i;
      })


    if (this.readonly){
      this.name = this.sprint.name;
      this.description = this.sprint.description;
      this.from = new Date(this.sprint.dateFrom).toISOString();
      this.to = new Date(this.sprint.dateTo).toISOString();
    }

  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.issueProvider.getIssueBySprintId(this.sprint.id)
      .subscribe(data =>{
        this.issues = data;
        loading.dismiss();
      });
  }


  createSprint(){

    if (this.name == undefined || this.name == null) {
      this.utilsProvider.presentToast("Falta ingresar el 'NOMBRE' del sprint")
    }else if(this.from == undefined || this.from == null) {
      this.utilsProvider.presentToast("Falta ingresar la fecha 'DESDE' del sprint")
    } else if(this.to == undefined || this.to == null){
      this.utilsProvider.presentToast("Falta ingresar la fecha 'HASTA' del sprint")
    }else{

      let fromDate:string[] = this.from.toString().split("-");
      let toDate:string[] = this.to.toString().split("-");

      let sprint = {
        "name":this.name,
        "description":this.description,
        "date_from": new Date(fromDate[1] + "/" + fromDate[2] +  "/" + fromDate[0]).getTime(),
        "date_to": new Date(toDate[1] + "/" + toDate[2] +  "/" + toDate[0]).getTime(),
      }

      this.sprintProvider.createSprint(sprint)
        .subscribe((s:Sprint) =>{
          this.utilsProvider.presentToast("Se ha generado con éxito " + s.name);
          this.cancel();
        });
    }
  }

  validateDateFrom(date:Date){

    if (date != null ){
      let isValid = true;
      let dateArray: string[] = date.toString().split("-");
      let dateToString = dateArray[2] + "/" + dateArray[1] +  "/" + dateArray[0];
      let dateMillisecond = new Date(dateArray[1] + "/" + dateArray[2] +  "/" + dateArray[0]).getTime();

      this.sprintProvider.sprints.forEach( (s:Sprint) =>{
        if (dateMillisecond >= s.dateFrom && dateMillisecond <= s.dateTo)
          isValid = false;
      });

      if (!isValid){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"La fecha " + dateToString + " ya está contenida en otro Sprint",
          buttons:[{
            text:'Aceptar',
            handler: data =>{
              this.from = null;
            }
          }]
        }).present();
      }
    }
  }

  validateDateTo(date:Date){

    if (date != null ){

      let isValid = true;
      let dateArray: string[] = date.toString().split("-");
      let dateToString = dateArray[2] + "/" + dateArray[1] +  "/" + dateArray[0];
      let dateMillisecond = new Date(dateArray[1] + "/" + dateArray[2] +  "/" + dateArray[0]).getTime();

      this.sprintProvider.sprints.forEach( (s:Sprint) =>{
        if (dateMillisecond >= s.dateFrom && dateMillisecond <= s.dateTo)
          isValid = false;
      });

      if (!isValid){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"La fecha " + dateToString + " ya está contenida en otro Sprint",
          buttons:[{
            text:'Aceptar',
            handler: data =>{
              this.to = null;
            }
          }]
        }).present();
      }
    }
  }

  cancel(){
    this.navCtrl.pop();
  }

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true});
  }

  createNewIssue(){
    this.issueProvider.issue.reporter = 'Leandro Sebastian Cocchi';
    this.navCtrl.push(IssuePage, {"issue":null, "update": false, "backlog": false});
  }

  presentPopover(myEvent, issue:IIssue) {
    let popover = this.popoverCtrl.create(PopoverBacklogPage, {'issue':issue});

    popover.onDidDismiss(() => {
      let loading = this.loadingCtrl.create(
        { spinner: 'ios',
          content:'Cargando...'
        });
      loading.present();

      this.issueProvider.getIssueBySprintId(this.sprint.id)
        .subscribe(data =>{
          this.issues = data;
          loading.dismiss();
        });
    });

    popover.present({
      ev: myEvent
    });
  }
}

interface Sprint{
  id:number;
  name:string;
  created:number;
  dateFrom:number;
  dateTo:number;
  description:string;
  enabled:boolean;
}
