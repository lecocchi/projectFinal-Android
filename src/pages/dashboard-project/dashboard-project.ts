import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
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
              private storage: Storage,
              public platform:Platform,
              public alertCtrl: AlertController) {

    this.registerBackButton();
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

    let projectToSend = {
      "id": project.id,
      "name": project.name
    }

    this.navCtrl.push(this.rootPage, {"rol": this.user.rol, "firstName": this.user.firstName, "lastName": this.user.lastName, "project": projectToSend});
  }


  registerBackButton(){
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
}
