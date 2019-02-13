import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DailyProvider} from "../../providers/daily/daily";
import {DateProvider} from "../../providers/date/date";

@Component({
  selector: 'page-daily-description',
  templateUrl: 'daily-description.html',
})
export class DailyDescriptionPage {

  yesterday: string;
  today: string;
  member:any;
  dailyActive:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dailyProvider:DailyProvider,
              public dateProvider:DateProvider) {

    this.member = this.navParams.get("member");

  }


  ionViewWillEnter(){
    this.dailyProvider.daily.daily_items.filter( m => {
      if (m.userName === this.member.userName ) {
        this.today = m.today;
        this.yesterday = m.yesterday;
      }
    });

    if ( this.dailyProvider.daily.created_at != undefined){
      this.dateProvider.now()
        .subscribe(date =>{
          this.dailyActive = (this.dailyProvider.daily.created_at.dayOfMonth === date.dayOfMonth && this.dailyProvider.daily.created_at.monthValues === date.monthValues && this.dailyProvider.daily.created_at.year === date.year);
        })
    }else{
      this.dailyActive = true;
    }

  }

  accept(){
    this.dailyProvider.daily.daily_items.filter(m => {
      if (m.userName == this.member.userName){
        m.today = this.today;
        m.yesterday  = this.yesterday;
      }
    })

    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }

}
