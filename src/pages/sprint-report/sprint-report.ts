import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import {SprintProvider} from "../../providers/sprint/sprint";
import {IssuePage} from "../issue/issue";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sprint-report',
  templateUrl: 'sprint-report.html',
})
export class SprintReportPage {

  sprintReports: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sprintProvider: SprintProvider,
    public loadingCtrl:LoadingController, 
    public popoverCtrl: PopoverController,
    public storage: Storage) {
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.storage.get("projectId")
      .then(idProject => {
        this.sprintProvider.sprintReportsByProject(idProject)
        .subscribe( reports =>{
          this.sprintReports = reports;
          loading.dismiss();
        });
      });
  }

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true});
  }

}
