import {Component} from '@angular/core';
import {AlertController, MenuController, NavController, Platform} from 'ionic-angular';

import {BacklogPage} from '../backlog/backlog';
import {ActiveSprintPage} from "../active-sprint/active-sprint";
import {DailyPage} from "../daily/daily";
import {ReportsPage} from "../reports/reports";
import {UsersPage} from "../users/users";
import {ConfigPage} from "../config/config";
import {SprintsPage} from "../sprints/sprints";

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

  public alertShown:boolean = false;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController,public platform: Platform,public alertCtrl: AlertController) {

    this.platform.registerBackButtonAction(()=>{

      if (this.navCtrl.getActive().component.name == 'HomePage'){
        this.alertCtrl.create({
          title: 'Atras',
          subTitle:'Desea  salir de la app?',
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

  goToPage(page){
    this.navCtrl.push(page);
  }

}
