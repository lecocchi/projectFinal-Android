import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {SprintPage} from "../sprint/sprint";

@Component({
  selector: 'page-sprint',
  templateUrl: 'sprints.html',
})
export class SprintsPage {

  sprints:any = [];
  sprintPage:any = SprintPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider:SprintProvider ) {
  }

  ionViewWillEnter() {
    this.sprintProvider.getAllSprints()
      .subscribe( s =>{
        this.sprints = s.reverse();
      })
  }

  createSprint(){
    this.navCtrl.push(this.sprintPage);
  }

}
