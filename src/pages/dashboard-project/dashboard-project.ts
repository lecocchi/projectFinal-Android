import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-dashboard-project',
  templateUrl: 'dashboard-project.html',
})
export class DashboardProjectPage {

  projects:any = [];
  rootPage = HomePage;
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewWillEnter() {
    this.projects = this.navParams.get("p");
    this.user = this.navParams.get("user");
  }

  selectProject(project:any){
    this.storage.remove("projectId");
    this.storage.remove("projectName");

    this.storage.set("projectId", project.id);
    this.storage.set("projectName", project.name);

    this.navCtrl.push(this.rootPage, {"rol": this.user.rol, "firstName": this.user.firstName, "lastName": this.user.lastName});
  }

}
