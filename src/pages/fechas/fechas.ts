import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";

@Component({
  selector: 'page-fechas',
  templateUrl: 'fechas.html',
})
export class FechasPage {
  createdDate:any;
  updatedDate:any;
  resolvedDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public issueProvider:IssueProvider) {

    this.createdDate = new Date(this.issueProvider.issue.created).toISOString();
    this.updatedDate = new Date(this.issueProvider.issue.updated).toISOString();
    this.resolvedDate = new Date(this.issueProvider.issue.resolved).toISOString();
  }


}
