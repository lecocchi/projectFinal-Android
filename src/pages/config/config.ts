import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VersionsPage} from "../versions/versions";
import {LabelPage} from "../label/label";
import {PhasePage} from "../phase/phase";
import {PriorityPage} from "../priority/priority";
import {RolPage} from "../rol/rol";
import {StatePage} from "../state/state";

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  versionsPage:any = VersionsPage;
  labelPage:any = LabelPage;
  phasePage:any = PhasePage;
  priorityPage:any = PriorityPage
  rolPage:any = RolPage
  statePage:any = StatePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
