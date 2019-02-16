import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage = HomePage;
  userName:string;
  password:string;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider,
              public utilProvider: UtilsProvider) {

  }

  goToOtherPage() {
    this.navCtrl.push(HomePage);
  }

  loginForUserAndPass(){
    let user = {
      "user_name" : this.userName,
      "password" : this.password
    }

    this.userProvider.loginForUserAndPass(user)
      .subscribe((u:any) => {
        this.navCtrl.push(this.rootPage);
        console.log(u);
      },
      (err) => {
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      })
  }

}
