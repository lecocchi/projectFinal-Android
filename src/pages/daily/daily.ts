import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyItemPage} from "../daily-item/daily-item";
import {DailyProvider} from "../../providers/daily/daily";

@Component({
  selector: 'page-daily-tab',
  templateUrl: 'daily.html'
})
export class DailyPage {

  dailyItemPage:any = DailyItemPage;
  dailies:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dailyProvider: DailyProvider) {
    this.dailyProvider.getAllDailies()
      .subscribe( data => {
        this.dailies = data;
      });
  }

  createNewDaily(){

    let daily:any = {
      "first_name":"Leandro",
      "last_name":"Cocchi",
      "user_name":"lecocchi",
      "daily_items":[]
    }


    this.dailyProvider.daily = daily;
    this.navCtrl.push(this.dailyItemPage);
  }

  openDetail(daily:any){

    this.dailyProvider.daily = daily;

    // let dailyCreate:any = {
    //   "first_name":daily.first_name,
    //   "last_name":daily.last_name,
    //   "user_name":daily.user_name,
    //   "avatar": daily.avatar,
    //   "daily_items":[]
    // }
    //
    // this.dailyProvider.daily = dailyCreate;
    //
    // daily.daily_items.forEach( item =>{
    //   let dailyItems = {
    //     "first_name": item.first_name,
    //     "last_name": item.last_name,
    //     "user_name": item.user_name,
    //     "avatar": item.avatar,
    //     "yesterday": item.yesterday,
    //     "today": item.today
    //   }
    //
    //   this.dailyProvider.daily.daily_items.push(dailyItems);
    // });

    this.navCtrl.push(this.dailyItemPage);
  }

}
