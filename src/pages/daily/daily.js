import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DailyDescriptionPage } from '../daily-description/daily-description';
import { DailyDescriptionProvider } from '../../providers/daily-description/daily-description';
/**
 * Generated class for the DailyTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DailyPage = (function () {
    function DailyPage(navCtrl, navParams, dailyDescriptionProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dailyDescriptionProvider = dailyDescriptionProvider;
        this.items = [];
        this.items = dailyDescriptionProvider.items;
        this.dailyPush = DailyDescriptionPage;
    }
    DailyPage.prototype.push = function (position) {
        this.navCtrl.push(DailyDescriptionPage, {
            index: position
        });
    };
    DailyPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-daily-tab',
                    templateUrl: 'daily.html',
                },] },
    ];
    /** @nocollapse */
    DailyPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: DailyDescriptionProvider, },
    ]; };
    return DailyPage;
}());
export { DailyPage };
//# sourceMappingURL=daily.js.map