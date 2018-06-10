import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    member: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.member  = this.navParams.get('member');
        this.today = this.member.today;
        this.yesterday = this.member.yesterday;
    }

    accept(){
        // this.dailyDescriptionProvider.items[this.navParams.get('index')].today = this.today;
        // this.dailyDescriptionProvider.items[this.navParams.get('index')].yesterday = this.yesterday;
        this.navCtrl.pop();
    }

}
