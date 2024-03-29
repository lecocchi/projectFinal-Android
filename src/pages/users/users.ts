import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, PopoverController} from 'ionic-angular';
import {UserDescriptionPage} from "../user-description/user-description";
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {


  users:any = [];

  userDescriptionPage:any = UserDescriptionPage;
  imagePreview: string;
  image64: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter(){

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    
    this.userProvider.getAllUser()
    .subscribe( (users:any) => {
      this.users = users;
      loading.dismiss();
    });
  }

  openDetail(user:any){
    this.navCtrl.push(this.userDescriptionPage, {
      'id' : user.id,
      'firstName':user.firstName,
      'lastName':user.lastName,
      'dni':user.dni,
      'email':user.email,
      'userName': user.userName,
      'rol':user.rol,
      'avatar':user.avatar,
      'mode': 'detail',
      'isEnabled' : user.enabled,
      'isNetwork' : user.isNetwork,
      'password' : user.password
    });
  }

  createUser(){
    this.navCtrl.push(this.userDescriptionPage,{mode: 'create'});
  }
}
