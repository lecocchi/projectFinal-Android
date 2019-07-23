import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ProjectProvider } from '../../providers/project/project';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  members:any = [];
  project:any;
  id:number;
  name:string = '';
  description:string = '';
  isCreate:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController,
              public projectProvider: ProjectProvider,
              public utilsProvider:UtilsProvider) {
  }

  ionViewWillEnter() {

    this.project = this.navParams.get("project");
    this.isCreate = this.navParams.get("isCreate");

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();


    this.userProvider.getAllUser()
          .subscribe((users: any) => {

        for (let user of users) {
          let personToShow: any = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "userName": user.userName,
            "avatar": user.avatar,
            "yesterday": "",
            "today": "",
            "checked": false
          }
          this.members.push(personToShow);
        }

          if(!this.isCreate){
            this.name = this.project.name;
            this.description = this.project.description;
          }

          loading.dismiss();
      });
  }

  cancel(){
    this.navCtrl.pop();
  }

  createProject(){

    if (this.name == '') {
      this.utilsProvider.presentPrompt("Error", "El campo nombre no puede estar vacío");

    } else {

      if(this.isCreate){
        var project = {
          "name": this.name,
          "description": this.description
        }

        this.projectProvider.createProject(project)
          .subscribe((p:any)=>{
            this.navCtrl.pop();
            this.utilsProvider.presentToast(`Se creó el project ${p.name} con éxito`);
          });

      }else{

        var projectUpdate = {
          "id": this.project.id,
          "name": this.name,
          "description": this.description
        }
        this.projectProvider.updateProject(projectUpdate)
          .subscribe((p:any)=>{
            this.navCtrl.pop();
            this.utilsProvider.presentToast(`Se modificó el project ${p.name} con éxito`);
          });
      }
    }


  }
}
