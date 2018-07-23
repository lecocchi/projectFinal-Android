import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyItemPage} from "../daily-item/daily-item";
import {DailyProvider} from "../../providers/daily/daily";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-daily-tab',
  templateUrl: 'daily.html'
})
export class DailyPage {

  dailyItemPage:any = DailyItemPage;
  dailies:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dailyProvider: DailyProvider, public utils:UtilsProvider) {
  }

  ionViewWillEnter(){
    this.dailyProvider.getAllDailies()
      .subscribe( data => {
        this.dailies = data.reverse();
      });
  }

  createNewDaily(){

    this.dailyProvider.isThereDailyToday()
      .subscribe( isThereDaily =>{
        if (isThereDaily){
          this.utils.presentToast("Ya existe una daily activa para el día de hoy");
        } else{
          let daily:any = {
            "first_name":"Leandro",
            "last_name":"Cocchi",
            "user_name":"lecocchi",
            "daily_items":[]
          }

          this.dailyProvider.daily = daily;
          this.navCtrl.push(this.dailyItemPage);

        }
      });
  }

  openDetail(daily:any){
    this.dailyProvider.daily = daily;
    this.navCtrl.push(this.dailyItemPage);
  }

}
