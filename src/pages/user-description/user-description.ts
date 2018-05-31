import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-user-description',
  templateUrl: 'user-description.html',
})
export class UserDescriptionPage {

  firstName:string;
  lastName:string;
  dni:number;
  email:string;
  fullName:string;
  avatar:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstName = this.navParams.get('firstName');
    this.lastName = this.navParams.get('lastName');
    this.dni = this.navParams.get('dni');
    this.email = this.navParams.get('email');
    this.fullName = this.firstName + ' ' + this.lastName;
    this.avatar = this.navParams.get('avatar');
  }

}
