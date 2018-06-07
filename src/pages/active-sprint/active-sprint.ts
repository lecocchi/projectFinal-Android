import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";
import {IssuePage} from "../issue/issue";

@Component({
  selector: 'page-active-sprint-tab',
  templateUrl: 'active-sprint.html',
})
export class ActiveSprintPage {

  issues:any = [];
  avatar:string = 'https://picsum.photos/300/300?image=0';
  issuePage:any;

  constructor(public navCtrl: NavController, public issueProvider: IssueProvider) {
    this.issuePage = IssuePage;
  }

  ionViewDidLoad(){
    this.issueProvider.getAllIssueActiveSprint()
      .subscribe(data =>{
        this.issues = data;
      });
  }

  ionViewDidEnter(){
    this.issueProvider.getAllIssueActiveSprint()
      .subscribe(data =>{
        this.issues = data;
      });
  }

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true, "backlog": false});
  }

  createNewIssue(){
    this.navCtrl.push(IssuePage, {"issue":null, "update": false, "backlog": false});
  }
}
