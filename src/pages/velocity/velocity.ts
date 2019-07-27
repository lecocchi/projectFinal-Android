import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, PopoverController} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {SprintPage} from "../sprint/sprint";
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';


@Component({
  selector: 'page-velocity',
  templateUrl: 'velocity.html',
})
export class VelocityPage {

  velocities: any = [];
  sprintPage:any = SprintPage;



  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider: SprintProvider,
    public loadingCtrl:LoadingController, 
    public popoverCtrl: PopoverController,
    public storage: Storage,
    public utilsProvider: UtilsProvider) {

  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.storage.get("projectId")
      .then(idProject =>{
        this.sprintProvider.velocityChart(idProject)
          .subscribe(v => {
            this.velocities = v;
            loading.dismiss();
          });
      });
  }

  goToPage(){}

  openSprint(idSprint:string){

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Procesando...'
      });
    loading.present();

    this.sprintProvider.getSprintById(idSprint)
      .subscribe( s =>{
        loading.dismiss();
        this.navCtrl.push(this.sprintPage, {'sprint': s, 'readonly': true, 'create':false});
      });
  }

  help(){
    this.utilsProvider.presentPrompt("","Los story points son una unidad de medida para expresar un estimado del esfuerzo total que será requerido para implementar completamente una porción de trabajo.");
  }

}
