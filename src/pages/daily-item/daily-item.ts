import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyDescriptionPage} from "../daily-description/daily-description";
import {DailyDescriptionProvider} from "../../providers/daily-description/daily-description";

@Component({
    selector: 'page-daily-item',
    templateUrl: 'daily-item.html',
})
export class DailyItemPage {

    members: any[] = [];
    daily:any;
    dailyCreated: Date = new Date();

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public dailyDescriptionProvider: DailyDescriptionProvider) {
        this.daily = this.navParams.get('daily');

        if (this.daily != undefined){
            this.dailyCreated = this.daily.date;
            this.members = dailyDescriptionProvider.items;
        }
        else
            this.members = null;
    }

    push(position: number) {
        this.navCtrl.push(DailyDescriptionPage, {
            index: position
        })

    }
}
