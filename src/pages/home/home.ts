import {Component} from '@angular/core';
import {AlertController, MenuController, NavController, Platform, NavParams, LoadingController, PopoverController} from 'ionic-angular';

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
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { HomeAdminPage } from '../home-admin/home-admin';

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
  projectsPage:any = ProjectsPage;
  homeAdmin:any = HomeAdminPage; 
  rol:number;
  firstName: string;
  lastName: string;
  rolName: string;
  projectName:string;
  projectId:string;
  userId:string;

  public alertShown:boolean = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public platform: Platform,
              public alertCtrl: AlertController,
              private storage: Storage, 
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController,
              public userProvider: UserProvider) {

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

    this.projectName = this.navParams.get("project").name;


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

  ionViewDidLoad(){
    const alert = this.alertCtrl.create({
      title: 'Recuerde ....',
      subTitle: 'Para cambiar de proyecto presione sobre el nombre del proyecto ubicado en la parte superior',
      buttons: [{
        text:'Aceptar',
        cssClass: 'btn-alert-ok',
      }]
    });
    alert.present()
  }

  ionViewWillEnter() { }

  goToPage(page){
    this.navCtrl.push(page);
  }

  changeProject(){

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.storage.get("id")
      .then((i)=>{
        this.userProvider.getProjectsByUserId(i)
          .subscribe((p:any)=>{
            this.storage.get("projectId")
              .then((i)=>{
                this.projectId = i;

                if(p.length > 1)
                  this.showRadio(p);
                else{
                  const alert = this.alertCtrl.create({
                  title: 'Proyectos',
                  subTitle: 'Usted solamente esta asociado a un solo proyecto.\n Para mayor información comuniquese con un administrador.',
                  buttons: [{
                    text:'Aceptar',
                    cssClass: 'btn-alert-ok',
                    }]
                  });
                  alert.present()
                }
                loading.dismiss();
              })
          });
      });
  }

  showRadio(projects:any) {
      let alert = this.alertCtrl.create();
      alert.setTitle('Proyectos');

      projects.forEach(p => {
        alert.addInput({
        type: 'radio',
        label: p.name,
        value: p.id,
        checked: (p.id === this.projectId)
        });
      });

      alert.addButton({
        text: 'Cancelar',
        cssClass: 'btn-alert-cancel'});

      alert.addButton({
        text: 'Aceptar',
        cssClass: 'btn-alert-ok',
        handler: (data:any) => {
          this.storage.remove("projectId");
          this.storage.set("projectId", data);

          this.projectName = projects.find(e => e.id === data).name

          this.storage.remove("projectName");
          this.storage.set("projectName", this.projectName);
        }
      });
    alert.present();
  }

  closeSession(){
    this.navCtrl.push(LoginPage);
  }
}
