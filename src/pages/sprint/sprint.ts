import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprint.html',
})
export class SprintPage {
  from:Date;
  to:Date;
  name:string;
  description:string;
  isValidFrom:boolean = false;
  isValidTo:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  sprintProvider:SprintProvider,
              public utilsProvider:UtilsProvider,
              public alertCtrl:AlertController) {}


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

      // this.sprintProvider.createSprint(sprint)
      //   .subscribe(
      //     (s:Sprint) =>{
      //       console.log(s);
      //       this.utilsProvider.presentToast("Se ha generado el sprint  con éxito");
      //       this.cancel();
      //     },
      //     error =>{
      //       this.alertCtrl.create({
      //         title:"Error",
      //         subTitle: error.error.message,
      //         buttons:[{
      //           text:"Aceptar",
      //           role: "cancel"
      //         }]
      //       }).present();
      //     })
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
}

interface Sprint{
  name:string;
  created:number;
  dateFrom:number;
  dateTo:number;
  description:string;
  enabled:boolean;
}
