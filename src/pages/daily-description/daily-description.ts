import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DailyDescriptionProvider } from '../../providers/daily-description/daily-description';

/**
 * Generated class for the DailyDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-daily-description',
  templateUrl: 'daily-description.html',
})
export class DailyDescriptionPage {

  yesterday: string;
  today: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dailyDescriptionProvider: DailyDescriptionProvider) {

    this.today = this.dailyDescriptionProvider.items[this.navParams.get('index')].today;
    this.yesterday = this.dailyDescriptionProvider.items[this.navParams.get('index')].yesterday;
  }

  accept(){
    this.dailyDescriptionProvider.items[this.navParams.get('index')].today = this.today;
    this.dailyDescriptionProvider.items[this.navParams.get('index')].yesterday = this.yesterday;
    this.navCtrl.pop();
  }

}
