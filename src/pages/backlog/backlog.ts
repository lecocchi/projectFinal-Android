import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {IssuePage} from "../issue/issue";
import {IssueProvider} from "../../providers/issue/issue";

@IonicPage()
@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

  issues:any = [];
  avatar:string = 'https://picsum.photos/300/300?image=0';
  issuePage:any;
  loading:boolean = true;

  constructor(public navCtrl: NavController, public issueProvider: IssueProvider) {
    this.issuePage = IssuePage;
  }

  ionViewDidLoad(){
    this.issueProvider.getAllIssueBacklog()
      .subscribe(data =>{
        this.issues = data;
        this.loading = false;
      });
  }

  ionViewDidEnter(){
    this.issueProvider.getAllIssueBacklog()
      .subscribe(data =>{
        this.issues = data;
        this.loading = false;
      });
  }

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true, "backlog": true});
  }

  createNewIssue(){
    this.navCtrl.push(IssuePage, {"issue":null, "update": false, "backlog": true});
  }

}
