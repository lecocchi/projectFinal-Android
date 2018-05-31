import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VersionsProvider} from "../../providers/versions/versions";
import {VersionDescriptionPage} from "../version-description/version-description";

@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {


  versions:any = null;

  versionDescriptionPage:any = VersionDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public version: VersionsProvider) {
  }

  ionViewDidLoad() {
    this.version.getAllVersion()
      .subscribe( (data) => {
        this.versions = data;
      })
  }

  ionViewDidEnter(){
    this.version.getAllVersion()
      .subscribe( (data) => {
        this.versions = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(version:string){
    this.navCtrl.push(this.versionDescriptionPage, {version: version, update: true});
  }

}
