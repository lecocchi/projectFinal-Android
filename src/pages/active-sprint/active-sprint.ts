import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IssuePage} from "../issue/issue";

@Component({
  selector: 'page-active-sprint-tab',
  templateUrl: 'active-sprint.html',
})
export class ActiveSprintPage {
  items:any = [
    {
      "issueId":"SID-0",
      "title":"Requerimiento SID-0",
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      "issueId":"SID-1",
      "title":"Requerimiento SID-1",
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },
    {
      "issueId":"SID-2",
      "title":"Requerimiento SID-2",
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    },{
      "issueId":"SID-3",
      "title":"Requerimiento SID-3",
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  openDetail(item:any){
    //this.presentToast(message);
    this.navCtrl.push(IssuePage,{"issueId":item.issueId, "title":item.title});

  }

}
