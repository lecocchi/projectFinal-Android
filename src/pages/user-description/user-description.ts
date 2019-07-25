import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-user-description',
  templateUrl: 'user-description.html',
})
export class UserDescriptionPage {

  id: number;
  firstName: string = "";
  lastName: string;
  dni: number;
  email: string;
  userName: string;
  fullName: string;
  password: string;
  mode: string;
  class: string = 'login';
  role: string;
  enabledText: string;
  isEnabled: boolean;
  isNetwork: boolean;
  classEnabled: string;
  projects:any = [];
  projects_id:any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public utilProvider: UtilsProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public alertCtrl: AlertController) {

    this.mode = this.navParams.get('mode');
    this.role = "1";

    if (this.mode === 'create'){
      this.firstName = "";
      this.fullName = 'Nuevo Usuario';
      this.isEnabled = true;
      this.enabledText = 'Habilitado';
      this.isNetwork = false;
    }else{
      this.id = this.navParams.get('id');
      this.firstName = this.navParams.get('firstName');
      this.lastName = this.navParams.get('lastName');
      this.dni = this.navParams.get('dni');
      this.email = this.navParams.get('email');
      this.fullName = this.firstName + ' ' + this.lastName;
      this.userName = this.navParams.get('userName');
      this.isEnabled = this.navParams.get('isEnabled');
      this.isNetwork = this.navParams.get('isNetwork');
      this.role = this.navParams.get('rol');
      this.password = this.navParams.get('password');

      let loading = this.loadingCtrl.create(
        { spinner: 'ios',
          content:'Cargando...'
        });
      loading.present();

      userProvider.getProjectsByUserId(this.id)
        .subscribe((p)=>{
          this.projects = p;
          loading.dismiss();
        });
    }

    this.class = (this.isNetwork) ? 'enabled' : 'disabled';

    if (this.isEnabled) {
      this.classEnabled = 'enabledToggle';
      this.enabledText = 'Habilitado';
    } else {
      this.classEnabled = 'disabledToggle';
      this.enabledText = 'No habilitado';
    }


  }

  change() {
    this.class = (this.isNetwork) ? 'enabled' : 'disabled';
    this.password = '';
  }

  accept() {
  }

  changeEnabled() {
    if (this.isEnabled) {
      this.classEnabled = 'enabledToggle';
      this.enabledText = 'Habilitado';
    } else {
      this.classEnabled = 'disabledToggle';
      this.enabledText = 'No habilitado';
    }
  }

  createUser() {

    let user = {
      "id": this.id,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "dni": this.dni,
      "email": this.email,
      "userName": this.userName,
      "rol": this.role,
      "password": this.password,
      "enabled": this.isEnabled,
      "isNetwork": this.isNetwork
    }

    let loading = this.loadingCtrl.create(
    { spinner: 'ios',
      content:'Cargando...'
    });
    loading.present();

    if (this.mode === 'create'){
      this.userProvider.createUser(user)
      .subscribe((u: any) => {

        let user_projects = {
          "user_id": u.id,
          "projects_id":this.projects.map((p) => p.id)
        }

        this.userProvider.addProjectsByUser(user_projects)
          .subscribe(()=>{
            loading.dismiss();
            this.utilProvider.presentToast("Se creó el usuario " + u.firstName + " " + u.lastName);
            this.navCtrl.pop();})},
      (err) => {
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      });
    }else{
      this.userProvider.updateUser(user)
      .subscribe((u:any) =>{

        let user_projects = {
          "user_id": this.id,
          "projects_id":this.projects.map((p) => p.id)
        }

        this.userProvider.addProjectsByUser(user_projects)
          .subscribe(()=>{
            loading.dismiss();
            this.utilProvider.presentToast("Se modificó el usuario " + user.firstName + " " + user.lastName);
            this.navCtrl.pop();})},
      (err) =>{
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      });
    }
  }

  updateProjects(){ 
    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.userProvider.getAllProjects()
      .subscribe((p:any)=>{
      
        let alert = this.alertCtrl.create();
        alert.setTitle('Proyectos');

        p.forEach(project => {
          alert.addInput({
            type: 'checkbox',
            label: project.name,
            value: project.id,
            checked: this.projects.some(pr => project.id === pr.id)
          });});

        alert.addButton({
          text: 'Cancelar',
          cssClass: 'btn-alert-cancel',
          });
        alert.addButton({
          text: 'Aceptar',
          cssClass: 'btn-alert-ok',
          handler: data => {

            let loading = this.loadingCtrl.create(
              { spinner: 'ios',
                content:'Cargando...'
              });
            loading.present();

            let idsProject = {
              "ids": data
            };

            this.userProvider.getProjectsByProjectId(idsProject)
              .subscribe((p:any)=>{
                this.projects = p;
                loading.dismiss();})}});

        loading.dismiss();
        alert.present();
      });
  }
}
