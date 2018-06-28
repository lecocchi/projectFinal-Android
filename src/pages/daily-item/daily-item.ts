import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyDescriptionPage} from "../daily-description/daily-description";
import {DailyProvider} from "../../providers/daily/daily";
import {FilterPersonPage} from "../filter-person/filter-person";

@Component({
    selector: 'page-daily-item',
    templateUrl: 'daily-item.html',
})
export class DailyItemPage {

    members: any[] = [];
    daily:any;
    dailyCreated: Date = new Date();
    filterPerson: any = FilterPersonPage;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public dailyProvider: DailyProvider) {
        this.daily = this.navParams.get('daily');

        if (this.daily != undefined){
            this.dailyCreated = this.daily.date;
            this.members = this.dailyProvider.getDetailDailyByDailyId(this.daily.id);
        }
        else
            this.members = null;
    }

    push(member: any) {
        this.navCtrl.push(DailyDescriptionPage, { "member": member })
    }

    pushFilter(){
        this.navCtrl.push(FilterPersonPage);
    }
}
