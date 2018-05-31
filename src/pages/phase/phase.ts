import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PhaseProvider} from "../../providers/phase/phase";
import {PhaseDescriptionPage} from "../phase-description/phase-description";

/**
 * Generated class for the LabelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phase',
  templateUrl: 'phase.html',
})
export class PhasePage {

  phases:any = null;
  phaseDescriptionPage:any = PhaseDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public phaseProvider: PhaseProvider) {
  }

  ionViewDidLoad() {
    this.phaseProvider.getAllPhase()
      .subscribe( (data) => {
        this.phases = data;
      })
  }

  ionViewDidEnter(){
    this.phaseProvider.getAllPhase()
      .subscribe( (data) => {
        this.phases = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(phase:string){
    this.navCtrl.push(this.phaseDescriptionPage, {phase: phase, update: true});
  }

}
