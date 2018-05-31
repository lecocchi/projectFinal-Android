import { Component } from '@angular/core';
import { NavController, MenuController, Platform, AlertController } from 'ionic-angular';
import { BacklogPage } from '../backlog/backlog';
import { ActiveSprintPage } from "../active-sprint/active-sprint";
import { DailyPage } from "../daily/daily";
import { ReportsPage } from "../reports/reports";
import { UsersPage } from "../users/users";
import { IssuePage } from "../issue/issue";
var HomePage = (function () {
    function HomePage(navCtrl, menuCtrl, platform, alertCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.navTitle = "Home";
        this.backlogPage = BacklogPage;
        this.activeSprintPage = ActiveSprintPage;
        this.dailyPage = DailyPage;
        this.reportsPage = ReportsPage;
        this.usersPage = UsersPage;
        this.issuePage = IssuePage;
        this.alertShown = false;
    }
    HomePage.prototype.goToPage = function (page) {
        this.navCtrl.push(page);
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = function () { return [
        { type: NavController, },
        { type: MenuController, },
        { type: Platform, },
        { type: AlertController, },
    ]; };
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map