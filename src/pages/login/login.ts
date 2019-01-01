import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth.service"

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthService) {

  }

  goToOtherPage() {
    this.navCtrl.push(HomePage);
  }

  login(){
    // this.auth.login();
  console.log('Login success');
  }

}
