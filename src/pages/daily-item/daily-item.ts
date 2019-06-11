import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyDescriptionPage} from "../daily-description/daily-description";
import {DailyProvider} from "../../providers/daily/daily";
import {FilterPersonPage} from "../filter-person/filter-person";
import {DateProvider} from "../../providers/date/date";
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-daily-item',
  templateUrl: 'daily-item.html',
})
export class DailyItemPage {

  members: any[] = [];
  dailyCreated: any;
  dailyActive:boolean;
  sprint:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dailyProvider: DailyProvider, public dateProvider:DateProvider,
              public utils: UtilsProvider) {

    this.members = this.dailyProvider.daily.daily_items;
    this.sprint = this.dailyProvider.daily.sprint;

    if ( this.dailyProvider.daily.created_at == undefined){
      this.dateProvider.now()
        .subscribe( date => {
          date.dayOfWeek = this.utils.getDayInSpanish(date.dayOfWeek);
          this.dailyCreated  = date
        })
    }else{
      this.dailyCreated = this.dailyProvider.daily.created_at;
    }
  }

  ionViewWillEnter(){
    this.members = this.dailyProvider.daily.daily_items;

    if ( this.dailyProvider.daily.created_at != undefined){
      this.dateProvider.now()
        .subscribe(date =>{
          this.dailyActive = (this.dailyProvider.daily.created_at.dayOfMonth === date.dayOfMonth && this.dailyProvider.daily.created_at.monthValues === date.monthValues && this.dailyProvider.daily.created_at.year === date.year);
        })
    }else{
      this.dailyActive = true;
    }

  }

  push(member: any) {
    this.navCtrl.push(DailyDescriptionPage, { "member": member })
  }

  pushFilter(){
    this.navCtrl.push(FilterPersonPage);
  }

  createDaily(){
    this.dailyProvider.createDaily()
      .subscribe( (data:any) => {
        this.navCtrl.pop();
      });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
