import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
var ActiveSprintPage = (function () {
    function ActiveSprintPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [1, 2, 3, 4, 5, 6];
    }
    ActiveSprintPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-active-sprint-tab',
                    templateUrl: 'active-sprint.html',
                },] },
    ];
    /** @nocollapse */
    ActiveSprintPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
    ]; };
    return ActiveSprintPage;
}());
export { ActiveSprintPage };
//# sourceMappingURL=active-sprint.js.map