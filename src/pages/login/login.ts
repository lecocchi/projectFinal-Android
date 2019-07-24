import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, PopoverController} from 'ionic-angular';
import { HomePage } from "../home/home";
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DashboardProjectPage } from '../dashboard-project/dashboard-project';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage = HomePage;
  userName:string;
  password:string;
  userInfo:any = {};
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider,
              public utilProvider: UtilsProvider,
              private storage: Storage,
              public platform:Platform,
              private gp: GooglePlus,
              public afAuth: AngularFireAuth, 
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController) {

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
        this.storage.set("isNetwork", u.isNetwork);


        let loading = this.loadingCtrl.create(
              { spinner: 'ios',
                content:'Cargando...'
              });
            loading.present();


        this.userProvider.getProjectsByUserId(u.id)
          .subscribe((p:any)=>{
            if(p.length > 1)
              this.navCtrl.push(DashboardProjectPage, {"p":p, "user": u});
            else
              this.navCtrl.push(this.rootPage, {"rol": u.rol, "firstName": u.firstName, "lastName": u.lastName});

            loading.dismiss();
          })
      },
      (err) => {
        // statusText: "Unknown Error"
        console.log();

        if (err.statusText === "Unknown Error")
          this.utilProvider.presentPrompt("ERROR", "Error al conectarse con el servidor");
        else
          this.utilProvider.presentPrompt(err.error.title, err.error.message);
      })
  }

  loginGP(){

    if(this.platform.is('cordova')){

      console.log("LOGIN ANDROID");
      
      this.gp.login({}).then(res =>{

        console.log("RESPUESTA LOGIN GOOGLE " + res);

        let userLoginGooglePlus = {
          "email":res.email
        }

        this.userProvider.loginForGooglePlus(userLoginGooglePlus)
          .subscribe( (u:any) =>{
            this.storage.remove("id");
            this.storage.remove("email");
            this.storage.remove("firstName");
            this.storage.remove("lastName");
            this.storage.remove("rol");
            this.storage.remove("userName");
    
            this.storage.set("id", u.id);
            this.storage.set("email", u.email);
            this.storage.set("firstName", u.firstName);
            this.storage.set("lastName", u.lastName);
            this.storage.set("rol", u.rol);
            this.storage.set("userName", u.userName);
            this.storage.set("isNetwork", u.isNetwork);
    
            this.navCtrl.push(this.rootPage, {"rol": u.rol});
          },
          (err) =>{
            this.gp.logout().then((res)=>{});
            this.utilProvider.presentPrompt(err.error.title, err.error.message);
          })
      }).catch(err => console.log(err));
    }else{
      this.doGoogleLogin();
      // this.afAuth.auth.signOut().then(res =>{
      //   console.log(res)
      // })
    }
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        let userLoginGooglePlus = {
          "email":res.user.email
        }

        this.userProvider.loginForGooglePlus(userLoginGooglePlus)
          .subscribe( (u:any) =>{
            this.storage.remove("id");
            this.storage.remove("email");
            this.storage.remove("firstName");
            this.storage.remove("lastName");
            this.storage.remove("rol");
            this.storage.remove("userName");
    
            this.storage.set("id", u.id);
            this.storage.set("email", u.email);
            this.storage.set("firstName", u.firstName);
            this.storage.set("lastName", u.lastName);
            this.storage.set("rol", u.rol);
            this.storage.set("userName", u.userName);
            this.storage.set("isNetwork", u.isNetwork);


            let loading = this.loadingCtrl.create(
              { spinner: 'ios',
                content:'Cargando...'
              });
            loading.present();


            this.userProvider.getProjectsByUserId(u.id)
              .subscribe((p:any)=>{
                if(p.length > 1)
                  this.navCtrl.push(DashboardProjectPage, {"p":p, "user": u});
                else
                  this.navCtrl.push(this.rootPage, {"rol": u.rol, "firstName": u.firstName, "lastName": u.lastName});
                  //this.navCtrl.push(this.rootPage, {"rol": u.rol});

                loading.dismiss();
              })
    
          },
          (err) =>{
            this.gp.logout().then((res)=>{});
            this.utilProvider.presentPrompt(err.error.title, err.error.message);
          })
      })
      .catch((err)=>{
        this.utilProvider.presentPrompt("ERROR", "Error al intentar conectarse a google");
      })
    })
  }

}
