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
  update:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public issueProvider:IssueProvider) {

      this.update = this.navParams.data;

      if(this.update){
        this.createdDate = new Date(this.issueProvider.issue.created).toISOString();
        this.updatedDate = new Date(this.issueProvider.issue.updated).toISOString();
        if (this.issueProvider.issue.resolved != null)
          this.resolvedDate = new Date(this.issueProvider.issue.resolved).toISOString();

      }else{
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
      }
  }
}
