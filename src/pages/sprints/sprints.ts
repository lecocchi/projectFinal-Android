import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {SprintPage} from "../sprint/sprint";

@Component({
  selector: 'page-sprints',
  templateUrl: 'sprints.html',
})
export class SprintsPage {

  sprints:any = [];
  sprintPage:any = SprintPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public sprintProvider:SprintProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...'
    });

    loading.present();


    this.sprintProvider.getAllSprints()
      .subscribe( s =>{
        this.sprints = s;
        this.sprints.reverse();
        this.sprintProvider.sprints = s;
        loading.dismiss();
      });


  }

  createSprint(){
    this.navCtrl.push(this.sprintPage, {'sprint': null, 'readonly': false, 'create': true});
  }

  openSprint(id:string){
    this.sprintProvider.getSprintById(id)
      .subscribe( s =>{
        this.navCtrl.push(this.sprintPage, {'sprint': s, 'readonly': true, 'create':false});
      });
  }

}
