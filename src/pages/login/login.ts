import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

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
              public utilProvider: UtilsProvider,
              private storage: Storage) {

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

        this.storage.remove("id");
        this.storage.remove("email");
        this.storage.remove("firstName");
        this.storage.remove("lastName");
        this.storage.remove("rol");
        this.storage.remove("userName");
        this.storage.remove("leandro");

        this.storage.set("id", u.id);
        this.storage.set("email", u.email);
        this.storage.set("firstName", u.firstName);
        this.storage.set("lastName", u.lastName);
        this.storage.set("rol", u.rol);
        this.storage.set("userName", u.userName);

        this.navCtrl.push(this.rootPage, {"rol": u.rol});
      },
      (err) => {
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      })
  }

}
