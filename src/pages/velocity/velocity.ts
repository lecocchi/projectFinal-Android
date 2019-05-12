import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";


@Component({
  selector: 'page-velocity',
  templateUrl: 'velocity.html',
})
export class VelocityPage {

  velocities: any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider: SprintProvider) {
    this.sprintProvider.velocityChart()
      .subscribe(v => {
        this.velocities = v;
      })
  }

  ionViewDidLoad() {

  }

  goToPage(){

  }

}
