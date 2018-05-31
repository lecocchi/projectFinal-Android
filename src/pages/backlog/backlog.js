var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { IssuePage } from "../issue/issue";
/**
 * Generated class for the BacklogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BacklogPage = (function () {
    function BacklogPage(toastCtrl, navCtrl) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.items = [
            {
                "issueId": "SID-0",
                "title": "Requerimiento SID-0"
            }, {
                "issueId": "SID-1",
                "title": "Requerimiento SID-1"
            }, {
                "issueId": "SID-2",
                "title": "Requerimiento SID-2"
            }, {
                "issueId": "SID-3",
                "title": "Requerimiento SID-3"
            }, {
                "issueId": "SID-4",
                "title": "Requerimiento SID-4"
            }, {
                "issueId": "SID-5",
                "title": "Requerimiento SID-5"
            }, {
                "issueId": "SID-6",
                "title": "Requerimiento SID-6"
            }, {
                "issueId": "SID-7",
                "title": "Requerimiento SID-7"
            },
        ];
        this.issuePage = IssuePage;
    }
    BacklogPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    BacklogPage.prototype.openDetail = function (item) {
        //this.presentToast(message);
        this.navCtrl.push(IssuePage, { "issueId": item.issueId, "title": item.title });
    };
    BacklogPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-backlog',
                    templateUrl: 'backlog.html',
                },] },
    ];
    /** @nocollapse */
    BacklogPage.ctorParameters = function () { return [
        { type: ToastController, },
        { type: NavController, },
    ]; };
    /**
     * Generated class for the BacklogPage page.
     *
     * See https://ionicframework.com/docs/components/#navigation for more info on
     * Ionic pages and navigation.
     */
    BacklogPage = __decorate([
        IonicPage(),
        __metadata("design:paramtypes", [ToastController, NavController])
    ], BacklogPage);
    return BacklogPage;
}());
export { BacklogPage };
//# sourceMappingURL=backlog.js.map