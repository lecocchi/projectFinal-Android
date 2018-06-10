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
        this.dailies = this.dailyProvider.getAllDailies();
    }

    createNewDaily(){
        this.navCtrl.push(this.dailyItemPage);
    }

    openDetail(daily: any){
        this.navCtrl.push(this.dailyItemPage, {"daily": daily});
    }

}
