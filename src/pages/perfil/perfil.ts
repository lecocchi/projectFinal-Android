import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  firstName:string;
  lastName:string;
  role:string;
  email:string;
  isEnabled:boolean;
  userName:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage:Storage) {

    this.storage.get("firstName").then((f)=>{
      this.firstName = f;
    });

    this.storage.get("lastName").then((l)=>{
      this.lastName = l;
    });

    this.storage.get("userName").then((u)=>{
      this.userName = u;
    });

    this.storage.get("rol").then((r)=>{
      if(r === '1')
        this.role = 'Desarrollador';
      else if(r === '2')
        this.role = 'Scrum master';
      else
        this.role = 'Admin';
    });

    this.storage.get("email").then((e)=>{
      this.email = e;
    });

  }

  ionViewCanEnter(){ }

}
