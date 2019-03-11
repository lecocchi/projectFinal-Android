import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-user-description',
  templateUrl: 'user-description.html',
})
export class UserDescriptionPage {

  id: number;
  firstName: string = "";
  lastName: string;
  dni: number;
  email: string;
  userName: string;
  fullName: string;
  password: string;
  mode: string;
  class: string = 'login';
  role: string;
  enabledText: string;
  isEnabled: boolean;
  isNetwork: boolean;
  classEnabled: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public utilProvider: UtilsProvider) {

    this.mode = this.navParams.get('mode');
    this.role = "1";

    if (this.mode === 'create'){
      this.firstName = "";
      this.fullName = 'Nuevo Usuario';
      this.isEnabled = true;
      this.enabledText = 'Habilitado';
      this.isNetwork = false;
    }else{
      this.id = this.navParams.get('id');
      this.firstName = this.navParams.get('firstName');
      this.lastName = this.navParams.get('lastName');
      this.dni = this.navParams.get('dni');
      this.email = this.navParams.get('email');
      this.fullName = this.firstName + ' ' + this.lastName;
      this.userName = this.navParams.get('userName');
      this.isEnabled = this.navParams.get('isEnabled');
      this.isNetwork = this.navParams.get('isNetwork');
      this.role = this.navParams.get('rol');
      this.password = this.navParams.get('password');
    }

    this.class = (this.isNetwork) ? 'enabled' : 'disabled';

    if (this.isEnabled) {
      this.classEnabled = 'enabledToggle';
      this.enabledText = 'Habilitado';
    } else {
      this.classEnabled = 'disabledToggle';
      this.enabledText = 'No habilitado';
    }

  }

  change() {
    this.class = (this.isNetwork) ? 'enabled' : 'disabled';
    this.password = '';
  }

  accept() {
    console.log("Crear usuario");
  }

  changeEnabled() {
    if (this.isEnabled) {
      this.classEnabled = 'enabledToggle';
      this.enabledText = 'Habilitado';
    } else {
      this.classEnabled = 'disabledToggle';
      this.enabledText = 'No habilitado';
    }
  }

  createUser() {

    let user = {
      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "dni": this.dni,
      "email": this.email,
      "userName": this.userName,
      "rol": this.role,
      "password": this.password,
      "enabled": this.isEnabled,
      "isNetwork": this.isNetwork
    }

    if (this.mode === 'create'){
      this.userProvider.createUser(user)
      .subscribe((u: any) => {
          this.utilProvider.presentToast("Se creó el usuario " + u.firstName + " " + u.lastName);
          this.navCtrl.pop();
      },
        (err) => {
          this.utilProvider.presentPrompt(err.error.title, err.error.message);
        });
    }else{
      this.userProvider.updateUser(user)
      .subscribe((u:any) =>{
          this.utilProvider.presentToast("Se modificó el usuario " + user.firstName + " " + user.lastName);
          this.navCtrl.pop();
        },
        (err) =>{
          this.utilProvider.presentPrompt(err.error.title, err.error.message);
        }
      )
    }
  }
}
