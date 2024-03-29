import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import {timer} from "rxjs/observable/timer";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // rootPage:any = DashboardPage;

  showSplash = true;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();

        timer(3000).subscribe(
          () => this.showSplash = false
        );
      });
    });
  }


}

