import {Component} from '@angular/core';
import {AlertController, MenuController, NavController, Platform, NavParams} from 'ionic-angular';

import {BacklogPage} from '../backlog/backlog';
import {ActiveSprintPage} from "../active-sprint/active-sprint";
import {DailyPage} from "../daily/daily";
import {ReportsPage} from "../reports/reports";
import {UsersPage} from "../users/users";
import {ConfigPage} from "../config/config";
import {SprintsPage} from "../sprints/sprints";
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  navTitle: string = "Home";

  backlogPage: any = BacklogPage;
  activeSprintPage: any = ActiveSprintPage;
  dailyPage: any = DailyPage;
  reportsPage: any = ReportsPage;
  usersPage: any = UsersPage;
  SprintsPage: any = SprintsPage;
  configPage:any = ConfigPage;
  perfilPage:any = PerfilPage
  rol:string;

  public alertShown:boolean = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public platform: Platform,
              public alertCtrl: AlertController) {

    this.rol = this.navParams.get("rol");
    this.platform.registerBackButtonAction(()=>{

      if (this.navCtrl.getActive().id == 'n4-1'){
        this.alertCtrl.create({
          title: 'Salir',
          subTitle:'¿Desea  salir de la app?',
          buttons:[{
            text:'Si',
            handler: data=>{
              this.platform.exitApp();
            }
          },{
            text:'No'
          }]
        }).present();
      }else{
        this.navCtrl.pop();
      }
    })
  }


  ionViewCanEnter(){ }

  goToPage(page){
    this.navCtrl.push(page);
  }

}
