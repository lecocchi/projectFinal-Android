import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VelocityPage} from "../velocity/velocity";
import {SprintReportPage} from "../sprint-report/sprint-report";

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  velocityPage: any = VelocityPage;
  sprintReportPage: any = SprintReportPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  goToPage(page){
    this.navCtrl.push(page);
  }

}
