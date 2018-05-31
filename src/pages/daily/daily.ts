import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DailyDescriptionPage } from '../daily-description/daily-description';
import { IDailyDescription } from '../../Interfaces/IDailyDescription';
import { DailyDescriptionProvider } from '../../providers/daily-description/daily-description';

/**
 * Generated class for the DailyTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-daily-tab',
  templateUrl: 'daily.html',
})
export class DailyPage {

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
