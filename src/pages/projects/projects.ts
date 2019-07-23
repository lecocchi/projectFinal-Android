import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { ProjectProvider } from '../../providers/project/project';


@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  projectPage:any = ProjectPage
  projects:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public projectProvider: ProjectProvider,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();


    this.projectProvider.getAllProjects()
    .subscribe((p)=>{
      this.projects = p;
      loading.dismiss();
    });
   }

  createNewProject(){
    this.navCtrl.push(this.projectPage, {"isCreate": true});
  }

  openDetail(project: any){
    this.navCtrl.push(this.projectPage, {"project": project, "isCreate": false});
  }

}
