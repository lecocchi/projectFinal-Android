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
  member:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dailyProvider:DailyProvider) {

    this.member = this.navParams.get("member");

    this.dailyProvider.daily.daily_items.filter( m => {
      if (m.user_name == this.member.user_name ) {
        this.today = m.today;
        this.yesterday = m.yesterday;
      }
    });
  }

  accept(){

    this.dailyProvider.daily.daily_items.filter(m => {
      if (m.user_name == this.member.user_name){
        m.today = this.today;
        m.yesterday  = this.yesterday;
      }
    })

    this.navCtrl.pop();
  }

}
