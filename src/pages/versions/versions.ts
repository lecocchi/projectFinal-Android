import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VersionsProvider} from "../../providers/versions/versions";
import {VersionDescriptionPage} from "../version-description/version-description";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {


  versions:any = null;

  versionDescriptionPage:any = VersionDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public version: VersionsProvider,
              public storage:Storage) {
  }

  ionViewDidLoad() {
    this.storage.get("projectId")
      .then(idProject =>{
        this.version.getAllVersion(idProject)
          .subscribe( (data) => {
            this.versions = data;
          }
        )
      }
    )
  }

  ionViewDidEnter(){
    this.storage.get("projectId")
      .then(idProject =>{
        this.version.getAllVersion(idProject)
          .subscribe( (data) => {
            this.versions = data;
          }
        )
      }
    )
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(version:string){
    this.navCtrl.push(this.versionDescriptionPage, {version: version, update: true});
  }

}
