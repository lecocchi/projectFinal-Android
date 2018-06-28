import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserDescriptionPage} from "../user-description/user-description";

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  userDescriptionPage:any = UserDescriptionPage;

  users:any = [
    {
      'firstName':"Julieta",
      'lastName':'Cocchi',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      'firstName':"Leandro",
      'lastName':'Cocchi',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      'firstName':"Julieta",
      'lastName':'Cocchi',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      'firstName':"Julieta",
      'lastName':'Medved',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      'firstName':"Javier",
      'lastName':'Santacruz',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      'firstName':"Jesus",
      'lastName':'Rodriguez',
      'dni':'28154079',
      'email':'leandro.cocchi@hotmail.com',
      'userName':'lecocchi',
      'rol':'scrummaster',
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openDetail(user:any){
    this.navCtrl.push(this.userDescriptionPage, {
      'firstName':user.firstName,
      'lastName':user.lastName,
      'dni':user.dni,
      'email':user.email,
      'userName': user.userName,
      'rol':user.rol,
      "avatar":user.avatar
    } );
  }

}
