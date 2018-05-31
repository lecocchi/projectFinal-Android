import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rootPage = HomePage;
    }
    LoginPage.prototype.goToOtherPage = function () {
        this.navCtrl.push(HomePage);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-login',
                    templateUrl: 'login.html',
                },] },
    ];
    /** @nocollapse */
    LoginPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
    ]; };
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map