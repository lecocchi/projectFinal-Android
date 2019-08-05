import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { HomeAdminPage } from '../home-admin/home-admin';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-dashboard-project',
  templateUrl: 'dashboard-project.html',
})
export class DashboardProjectPage {

  projects: any = [];
  rootPage = HomePage;
  user: any;
  rol: number;
  firstName: string;
  lastName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider) {

  }

  ionViewWillEnter() {
    this.user = this.navParams.get("user");

    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();


    this.storage.get("firstName")
      .then(f => {
        this.firstName = f;

        this.storage.get("lastName")
          .then(l => {
            this.lastName = l;
            this.storage.get("rol")
              .then(r => {
                this.rol = r;

                this.storage.get("id")
                  .then(id => {
                    this.userProvider.getProjectsByUserId(id)
                      .subscribe((p: any) => {
                        this.projects = p;
                        loading.dismiss();

                        if (this.projects.length === 0) {
                          const alert = this.alertCtrl.create({
                            title: 'Aviso',
                            subTitle: 'Usted no esta asociado a ningún proyecto. Comuniquese con un administrador para que lo asocie a uno por favor.',
                            buttons: [{
                              text: 'Aceptar',
                              cssClass: 'btn-alert-ok',
                            }]
                          });
                          alert.present()
                        }
                      })
                  });
              })
          })
      });
  }

  selectProject(project: any) {
    this.storage.remove("projectId");
    this.storage.remove("projectName");

    this.storage.set("projectId", project.id);
    this.storage.set("projectName", project.name);

    let projectToSend = {
      "id": project.id,
      "name": project.name
    }

    this.navCtrl.push(this.rootPage, { "rol": this.rol, "firstName": this.firstName, "lastName": this.lastName, "project": projectToSend });
  }

  setting() {
    this.navCtrl.push(HomeAdminPage);
  }

  closeSession() {
    this.alertCtrl.create({
      title: 'Sesión',
      subTitle: '¿Desea  cerrar sesión?',
      buttons: [{
        text: 'Si',
        cssClass: 'btn-alert-ok',
        handler: data => {
          this.navCtrl.popToRoot();
        }
      }, {
        text: 'No',
        cssClass: 'btn-alert-cancel'
      }]
    }).present();
  }
}
