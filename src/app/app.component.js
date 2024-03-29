import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { timer } from "rxjs/observable/timer";
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        var _this = this;
        this.platform = platform;
        this.rootPage = LoginPage;
        this.showSplash = true;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            let splash = modalCtrl.create(Splash);
            splash.present();
            platform.ready().then(function () {
                statusBar.styleDefault();
                let splash = modalCtrl.create(Splash);
                splash.present();
                timer(3000).subscribe(function () { return _this.showSplash = false; });
            });
        });
    }
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = function () { return [
        { type: Platform, },
        { type: StatusBar, },
        { type: SplashScreen,},
        { type: ModalController, }
    ]; };
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map