import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PriorityDescriptionPage} from "../priority-description/priority-description";
import {PrioritiesProvider} from "../../providers/priority/priority";


@Component({
  selector: 'page-priority',
  templateUrl: 'priority.html',
})
export class PriorityPage {

  priorities:any = null;
  priorityDescriptionPage:any = PriorityDescriptionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public priorityProvider: PrioritiesProvider) {
  }

  ionViewDidLoad() {
    this.priorityProvider.getAllPriority()
      .subscribe( (data) => {
        this.priorities = data;
      })
  }

  ionViewDidEnter(){
    this.priorityProvider.getAllPriority()
      .subscribe( (data) => {
        this.priorities = data;
      })
  }


  goToPage(page:any){
    this.navCtrl.push(page, {update: false});
  }

  itemSelected(priority:string){
    this.navCtrl.push(this.priorityDescriptionPage, {priority: priority, update: true});
  }

}
