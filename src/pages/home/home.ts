import { Component } from '@angular/core';
import {NavController, MenuController, Platform, AlertController} from 'ionic-angular';

import { BacklogPage } from '../backlog/backlog';
import {ActiveSprintPage} from "../active-sprint/active-sprint";
import {DailyPage} from "../daily/daily";
import {ReportsPage} from "../reports/reports";
import {UsersPage} from "../users/users";
import {IssuePage} from "../issue/issue";
import {ConfigPage} from "../config/config";

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
  issuePage: any = IssuePage;
  configPage:any = ConfigPage;

  public alertShown:boolean = false;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController,public platform: Platform,public alertCtrl: AlertController) {


  }

  goToPage(page){
    this.navCtrl.push(page);
  }

}
