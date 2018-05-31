import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LabelProvider} from "../../providers/label/label";
import {LabelDescriptionPage} from "../label-description/label-description";

/**
 * Generated class for the LabelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-label',
  templateUrl: 'label.html',
})
export class LabelPage {

  labels:any = null;
  labelDescriptionPage:any = LabelDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public labelProvider: LabelProvider) {
  }

  ionViewDidLoad() {
    this.labelProvider.getAllLabel()
      .subscribe( (data) => {
        this.labels = data;
      })
  }

  ionViewDidEnter(){
    this.labelProvider.getAllLabel()
      .subscribe( (data) => {
        this.labels = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(version:string){
    this.navCtrl.push(this.labelDescriptionPage, {version: version, update: true});
  }

}
