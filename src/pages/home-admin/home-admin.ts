import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UsersPage} from "../users/users";
import { ProjectsPage } from '../projects/projects';


@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {

  usersPage: any = UsersPage;
  projectsPage:any = ProjectsPage

  constructor(public navCtrl: NavController){ }


  goToPage(page){
    this.navCtrl.push(page);
  }
}
