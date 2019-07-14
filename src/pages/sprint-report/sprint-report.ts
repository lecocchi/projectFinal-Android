import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {IssuePage} from "../issue/issue";

@Component({
  selector: 'page-sprint-report',
  templateUrl: 'sprint-report.html',
})
export class SprintReportPage {

  sprintReports: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider: SprintProvider) {

    this.sprintProvider.sprintReports()
      .subscribe( reports =>{
        this.sprintReports = reports;
      });
  }

  ionViewDidLoad() {}

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true});
  }

}
