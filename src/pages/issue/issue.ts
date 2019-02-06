import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IssueProvider } from "../../providers/issue/issue";
import { DetallePage } from "../detalle/detalle";
import { PersonaPage } from "../persona/persona";
import { FechasPage } from "../fechas/fechas";
import { ComentariosPage } from "../comentarios/comentarios";
import { UtilsProvider } from "../../providers/utils/utils";


@Component({
  selector: 'page-issue',
  templateUrl: 'issue.html',
})
export class IssuePage {

  tab1 = DetallePage;
  tab2 = PersonaPage;
  tab3 = FechasPage;
  tab4 = ComentariosPage;
  titleNavBar: string;
  issueActive: boolean;
  update: boolean;
  backlog: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public issueProvider: IssueProvider, public utils: UtilsProvider) {

    this.update = this.navParams.get('update');
    this.backlog = this.navParams.get("backlog");

    if (this.update) {
      this.issueProvider.issue = this.navParams.get('issue');
      this.titleNavBar = 'SID-' + this.issueProvider.issue.id;
      this.issueActive = (this.issueProvider.issue.state == 'Finalizado') ? false : true;
    } else {
      this.issueActive = true;
    }
  }

  accept() {
    if (this.issueProvider.issue.title == undefined) {
      this.utils.presentToast(`El título no puede estar vacío`);
    } else {
      if (this.update) {
        this.issueProvider.updateIssue(this.issueProvider.issueToUpdate, this.issueProvider.issue.id)
          .subscribe(data => {
            this.utils.presentToast(`Se modificó el issue SID- ${this.issueProvider.issue.id} con éxito`);
          });
      } else {
        this.issueProvider.issue.backlog = this.backlog;
        this.issueProvider.createNewIssue(this.issueProvider.issue)
          .subscribe(data => {
            this.utils.presentToast(`Se creó el issue con éxito`);
          });
      }
      this.navCtrl.pop();
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}
