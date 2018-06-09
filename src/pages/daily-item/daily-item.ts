import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IDailyDescription} from "../../Interfaces/IDailyDescription";
import {DailyDescriptionPage} from "../daily-description/daily-description";
import {DailyDescriptionProvider} from "../../providers/daily-description/daily-description";

/**
 * Generated class for the DailyItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-daily-item',
  templateUrl: 'daily-item.html',
})
export class DailyItemPage {

    items: IDailyDescription[] = [];
    createAt = new Date();
    scrummaster:string = 'Leandro Cocchi';
    dailyPush: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public dailyDescriptionProvider: DailyDescriptionProvider) {
        this.items = dailyDescriptionProvider.items;
        this.dailyPush = DailyDescriptionPage;

    }

    push(position: number) {
        this.navCtrl.push(DailyDescriptionPage, {
            index: position
        })

    }
}
