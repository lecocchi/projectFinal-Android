import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IssueProvider} from "../../providers/issue/issue";
import {DetallePage} from "../detalle/detalle";
import {PersonaPage} from "../persona/persona";
import {FechasPage} from "../fechas/fechas";
import {ComentariosPage} from "../comentarios/comentarios";
import {UtilsProvider} from "../../providers/utils/utils";


@Component({
  selector: 'page-issue',
  templateUrl: 'issue.html',
})
export class IssuePage {

  tab1 = DetallePage;
  tab2 = PersonaPage;
  tab3 = FechasPage;
  tab4 = ComentariosPage;
  titleNavBar:string;
  issueActive:boolean;
  update:boolean;

  constructor(public navCtrl:NavController, public navParams: NavParams,
              public issueProvider:IssueProvider, public utils:UtilsProvider){
    this.issueProvider.issue = this.navParams.get('issue');
    this.titleNavBar = 'SID-' + this.issueProvider.issue.id;
    this.update = this.navParams.get('update');
    this.issueActive = (this.issueProvider.issue.state == 'Finalizado') ? false : true;
  }

  accept(){
    if (this.update){
      this.issueProvider.updateIssue(this.issueProvider.issueToUpdate, this.issueProvider.issue.id)
        .subscribe(data =>{
          this.utils.presentToast(`Se modificó el issue SID- ${this.issueProvider.issue.id} con éxito`);
        });
    } else{
      this.issueProvider.createNewIssue(this.issueProvider.issue)
        .subscribe(data =>{
          this.utils.presentToast(`Se creó el issue con éxito`);
        });
    }
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }
}
