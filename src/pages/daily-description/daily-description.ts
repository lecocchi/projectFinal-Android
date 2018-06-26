import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DailyProvider} from "../../providers/daily/daily";

@Component({
  selector: 'page-daily-description',
  templateUrl: 'daily-description.html',
})
export class DailyDescriptionPage {

  yesterday: string;
  today: string;
  member: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dailyProvider:DailyProvider) {
    this.member  = this.navParams.get('member');
    this.today = this.member.today;
    this.yesterday = this.member.yesterday;
  }

  accept(){
    this.getDailyById(this.member.id).yesterday = this.yesterday;
    this.getDailyById(this.member.id).today = this.today;
    this.navCtrl.pop();
  }

  private getDailyById(id: number): any{
    for (let detail of this.dailyProvider.dailyDetails){
      if (detail.id == id){
        return detail;
      }
    }
  }

}
