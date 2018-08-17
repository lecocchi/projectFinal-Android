import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {IssuePage} from "../issue/issue";
import {IssueProvider} from "../../providers/issue/issue";

@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

  issues:any = [];
  avatar:string = 'https://picsum.photos/300/300?image=0';
  issuePage:any;

  constructor(public navCtrl: NavController, public issueProvider: IssueProvider, public loadingCtrl:LoadingController) {
    this.issuePage = IssuePage;
  }


  ionViewDidEnter(){

    let loading = this.loadingCtrl.create(
      { spinner: 'ios',
        content:'Cargando...'
      });
    loading.present();

    this.issueProvider.getAllIssueBacklog()
      .subscribe(data =>{
        this.issues = data;
        loading.dismiss();
      });
  }

  openDetail(issue:any){
    this.navCtrl.push(IssuePage,{"issue":issue, "update":true, "backlog": true});
  }

  createNewIssue(){
    this.navCtrl.push(IssuePage, {"issue":null, "update": false, "backlog": true});
  }

}
