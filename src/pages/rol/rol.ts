import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RolDescriptionPage} from "../rol-description/rol-description";
import {RolProvider} from "../../providers/rol/rol";


@Component({
  selector: 'page-rol',
  templateUrl: 'rol.html',
})
export class RolPage {

  roles:any = null;
  rolDescriptionPage:any = RolDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rolProvider: RolProvider) {
  }

  ionViewDidLoad() {
    this.rolProvider.getAllRol()
      .subscribe( (data) => {
        this.roles = data;
      })
  }

  ionViewDidEnter(){
    this.rolProvider.getAllRol()
      .subscribe( (data) => {
        this.roles = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(rol:string){
    this.navCtrl.push(this.rolDescriptionPage, {rol: rol, update: true});
  }

}
