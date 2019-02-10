import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { SprintProvider } from '../../providers/sprint/sprint';

@Component({
  selector: 'page-popover-sprint',
  templateUrl: 'popover-sprint.html',
})
export class PopoverSprintPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public sprintProvider: SprintProvider,
    public utils: UtilsProvider,
    public utilProvider: UtilsProvider) {
  }

  finish() {
    this.sprintProvider.finishSprint(this.viewCtrl.getNavParams().get("sprint"))
      .subscribe((i:any) => {
        this.utils.presentToast(`Se finalizó el Sprint ${i.id}`);
      },
      (err)=>{
        this.utilProvider.presentPrompt(err.error.title, err.error.message);
      });

      this.viewCtrl.dismiss();
  }

}
