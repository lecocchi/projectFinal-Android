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
import { VersionsPage } from '../versions/versions';
import { AboutPage } from '../about/about';
import { ProjectsPage } from '../projects/projects';

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
  perfilPage:any = PerfilPage;
  versionPage:any = VersionsPage;
  aboutPage:any = AboutPage;
  projectsPage:any = ProjectsPage
  rol:number;
  firstName: string;
  lastName: string;
  rolName: string;

  public alertShown:boolean = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public platform: Platform,
              public alertCtrl: AlertController) {

    this.rol = this.navParams.get("rol");
    switch (this.rol){
      case 1: {
        this.rolName = "Desarrollador";
        break;
      }
      case 2:{
        this.rolName = "Scrum Master";
        break;
      }
      case 3:{
        this.rolName = "Administrador";
        break;
      }
      default:{
        this.rolName = "Sin rol";
        break;
      }
    }

    this.firstName = this.navParams.get("firstName");
    this.lastName = this.navParams.get("lastName");


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
