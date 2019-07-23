import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, PopoverController} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {SprintPage} from "../sprint/sprint";


@Component({
  selector: 'page-velocity',
  templateUrl: 'velocity.html',
})
export class VelocityPage {

  velocities: any = [];
  sprintPage:any = SprintPage;



  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider: SprintProvider,
    public loadingCtrl:LoadingController, 
    public popoverCtrl: PopoverController) {

  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.sprintProvider.velocityChart()
      .subscribe(v => {
        console.log(v);
        this.velocities = v;
        loading.dismiss();
      });
  }

  goToPage(){}

  openSprint(id:string){

    var idSprint = id.split(" ");

    this.sprintProvider.getSprintById(idSprint[1])
      .subscribe( s =>{
        this.navCtrl.push(this.sprintPage, {'sprint': s, 'readonly': true, 'create':false});
      });
  }

}
