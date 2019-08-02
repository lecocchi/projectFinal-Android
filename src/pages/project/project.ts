import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ProjectProvider } from '../../providers/project/project';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { DashboardProjectPage } from '../dashboard-project/dashboard-project';

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
  usersToAdd:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController,
              public projectProvider: ProjectProvider,
              public utilsProvider:UtilsProvider,
              public alertCtrl: AlertController,
              public utilProvider: UtilsProvider,
              public storage: Storage) {
  }

  ionViewWillEnter() {

    this.project = this.navParams.get("project");
    this.isCreate = this.navParams.get("isCreate");

    if(!this.isCreate){

      let loading = this.loadingCtrl.create(
        { spinner: 'ios',
          content:'Cargando...'
        });
      loading.present();

      this.userProvider.getUserByProject(this.project.id)
            .subscribe((users: any) => {
              this.usersToAdd = users;

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
        },
        (err)=>{
          loading.dismiss();
        });
      }
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
            
            var projectUsers = {
              "project_id": p.id,
              "users_id":this.usersToAdd
            }

            this.projectProvider.updateUsersInProject(projectUsers)
              .subscribe(p1 =>{
                this.navCtrl.push(DashboardProjectPage);
                this.utilsProvider.presentToast(`Se creó el proyecto con éxito`);
              });
          });

      }else{

        var projectUpdate = {
          "id": this.project.id,
          "name": this.name,
          "description": this.description
        }
        this.projectProvider.updateProject(projectUpdate)
          .subscribe((p:any)=>{

            var projectUsers = {
              "project_id":this.project.id,
              "users_id":this.usersToAdd
            }

            this.projectProvider.updateUsersInProject(projectUsers)
              .subscribe(p1 =>{
                this.navCtrl.push(DashboardProjectPage);
                this.utilsProvider.presentToast(`Se modificó el proyecto con éxito`);
              });
          });
      }
    }


  }

  addUsers(){

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.userProvider.getAllUser()
      .subscribe((u:any) =>{

        if(this.isCreate){
          loading.dismiss();
          let alert = this.alertCtrl.create();
          alert.setTitle('Usuarios');

          u.forEach(p => {
            alert.addInput({
            type: 'checkbox',
            label: p.firstName + " " + p.lastName,
            value: p.id,
            checked: false
            });
          });
          
          alert.addButton({
            text: 'Cancelar',
            cssClass: 'btn-alert-cancel'});

            alert.addButton({
              text: 'Aceptar',
              cssClass: 'btn-alert-ok',
              handler: (data:any) => {
                this.usersToAdd = data;
              }
            });
          alert.present();
          
        }else{
          this.userProvider.getUserByProject(this.project.id)
            .subscribe((up:any)=>{

              loading.dismiss();

              let alert = this.alertCtrl.create();
              alert.setTitle('Usuarios');

              u.forEach(p => {
                alert.addInput({
                type: 'checkbox',
                label: p.firstName + " " + p.lastName,
                value: p.id,
                checked: up.some(pr => p.id === pr.id)
                });
              });
              
              alert.addButton({
                text: 'Cancelar',
                cssClass: 'btn-alert-cancel'});

                alert.addButton({
                  text: 'Aceptar',
                  cssClass: 'btn-alert-ok',
                  handler: (data:any) => {
                    this.usersToAdd = data;
                  }
                });
              alert.present();
            });
          }
      });
  }

  deleteProject(){

    const confirm = this.alertCtrl.create({
      title: 'Eliminar Proyecto',
      message: '¿Desea eliminar el proyecto?',
      buttons: [
        {
          text: 'No',
          cssClass: 'btn-alert-cancel'
        },
        {
          text: 'Si',
          cssClass: 'btn-alert-ok',
          handler: () => {
            this.projectProvider.deleteProject(this.project.id)
              .subscribe(()=>{
                this.storage.get("projectId")
                  .then(id=>{
                    this.navCtrl.push(DashboardProjectPage);
                    this.utilsProvider.presentToast(`Se elimino el proyecto con éxito`);
                  })
              },
              (err)=>{
                this.utilProvider.presentPrompt(err.error.title, err.error.message);
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
