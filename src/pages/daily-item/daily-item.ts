import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyDescriptionPage} from "../daily-description/daily-description";
import {DailyProvider} from "../../providers/daily/daily";
import {FilterPersonPage} from "../filter-person/filter-person";
import {DateProvider} from "../../providers/date/date";

@Component({
  selector: 'page-daily-item',
  templateUrl: 'daily-item.html',
})
export class DailyItemPage {

  members: any[] = [];
  daily:any;
  dailyCreated: any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dailyProvider: DailyProvider, public dateProvider:DateProvider) {

    this.members = this.dailyProvider.daily.daily_items;
    this.dailyCreated = dailyProvider.daily.created_at;
    this.dateProvider.now()
      .subscribe( date => {
        this.dailyCreated = date;
      })
  }

  ionViewWillEnter(){
    this.members = this.dailyProvider.daily.daily_items;
  }

  push(member: any) {
    this.navCtrl.push(DailyDescriptionPage, { "member": member })
  }

  pushFilter(){
    this.navCtrl.push(FilterPersonPage);
  }

  createDaily(){
    this.dailyProvider.createDaily()
      .subscribe( data => {
        this.navCtrl.pop();
      });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
