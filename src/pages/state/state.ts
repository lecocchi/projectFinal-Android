import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StateProvider} from "../../providers/state/state";
import {StateDescriptionPage} from "../state-description/state-description";


@Component({
  selector: 'page-state',
  templateUrl: 'state.html',
})
export class StatePage {

  states:any = null;
  stateDescriptionPage:any = StateDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stateProvider: StateProvider) {
  }

  ionViewDidLoad() {
    this.stateProvider.getAllState()
      .subscribe( (data) => {
        this.states = data;
      })
  }

  ionViewDidEnter(){
    this.stateProvider.getAllState()
      .subscribe( (data) => {
        this.states = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(rol:string){
    this.navCtrl.push(this.stateDescriptionPage, {rol: rol, update: true});
  }

}
