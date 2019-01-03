import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth.service"


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage = HomePage;
  sigIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthService) {
    this.sigIn = auth.loggedIn;
  }

  goToOtherPage() {
    this.navCtrl.push(HomePage);
  }

  login(){
    this.auth.login();
    console.log('Login success');
  }

}
