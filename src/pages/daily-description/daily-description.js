import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DailyDescriptionProvider } from '../../providers/daily-description/daily-description';
/**
 * Generated class for the DailyDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DailyDescriptionPage = (function () {
    function DailyDescriptionPage(navCtrl, navParams, dailyDescriptionProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dailyDescriptionProvider = dailyDescriptionProvider;
        this.today = this.dailyDescriptionProvider.items[this.navParams.get('index')].today;
        this.yesterday = this.dailyDescriptionProvider.items[this.navParams.get('index')].yesterday;
    }
    DailyDescriptionPage.prototype.accept = function () {
        this.dailyDescriptionProvider.items[this.navParams.get('index')].today = this.today;
        this.dailyDescriptionProvider.items[this.navParams.get('index')].yesterday = this.yesterday;
        this.navCtrl.pop();
    };
    DailyDescriptionPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-daily-description',
                    templateUrl: 'daily-description.html',
                },] },
    ];
    /** @nocollapse */
    DailyDescriptionPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: DailyDescriptionProvider, },
    ]; };
    return DailyDescriptionPage;
}());
export { DailyDescriptionPage };
//# sourceMappingURL=daily-description.js.map