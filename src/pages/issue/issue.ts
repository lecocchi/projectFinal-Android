import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { IssueProvider } from "../../providers/issue/issue";
import { DetallePage } from "../detalle/detalle";
import { PersonaPage } from "../persona/persona";
import { FechasPage } from "../fechas/fechas";
import { ComentariosPage } from "../comentarios/comentarios";
import { UtilsProvider } from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';
import { SprintProvider } from '../../providers/sprint/sprint';


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
  issueInactive: boolean;
  update: boolean;
  backlog: boolean;
  firstName: string;
  lastName: string;
  version: string;
  sprint: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider,
    public utils: UtilsProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public utilProvider: UtilsProvider,
    public sprintProvider: SprintProvider) {

    this.update = this.navParams.get('update');
    this.backlog = this.navParams.get("backlog");

    if (this.update) {
      this.issueProvider.issue = this.navParams.get('issue');
      this.titleNavBar = 'SID-' + this.issueProvider.issue.id;
      this.issueInactive = (this.issueProvider.issue.state === 'FINALIZADO') ? true : false;
    } else {
      this.cleanIssue();

      this.sprint = this.navParams.get("sprint");

      this.issueProvider.issue.id = null;
      this.issueInactive = false;
      this.issueProvider.issue.backlog = this.backlog;
      this.storage.get('firstName').then((f) => {
        this.firstName = f;
        this.storage.get('lastName').then((l) => {
          this.lastName = l;
          this.issueProvider.issue.reporter = this.firstName + ' ' + this.lastName;
        });
      });
    }
  }

  accept() {
    if (this.issueProvider.issue.title == undefined) {
      this.utilProvider.presentPrompt("ERROR", "El título no puede estar vacío");
    } else {

      if (this.update) {
        let loading = this.loadingCtrl.create(
          {
            spinner: 'ios',
            content: 'Procesando...'
          });
        loading.present();

        this.issueProvider.updateIssue(this.issueProvider.issueToUpdate, this.issueProvider.issue.id)
          .subscribe(data => {
            loading.dismiss();
            this.utils.presentToast(`Se modificó el issue con éxito`);
            this.navCtrl.pop();
          });
      } else {
        let loading = this.loadingCtrl.create(
          {
            spinner: 'ios',
            content: 'Procesando...'
          });
        loading.present();

        this.storage.get("projectId")
          .then(idProject => {
            this.issueProvider.issue.backlog = this.backlog;
            this.issueProvider.issue.idProject = idProject;

            if (!this.backlog)
              this.issueProvider.issue.sprint = this.sprint.id;

            this.issueProvider.createNewIssue(this.issueProvider.issue)
              .subscribe(data => {
                loading.dismiss();
                this.utils.presentToast(`Se creó el issue con éxito`);
                this.navCtrl.pop();
              },
                (err) => {
                  loading.dismiss();
                  this.utilProvider.presentPrompt("Error", "No se pudo crear el issue");
                });
          });
      }

    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  cleanIssue() {
    this.issueProvider.issue.id = null;
    this.issueProvider.issue.label = null;
    this.issueProvider.issue.plannedEnd = null;
    this.issueProvider.issue.plannedStart = null;
    this.issueProvider.issue.priority = null;
    this.issueProvider.issue.remaining = null;
    this.issueProvider.issue.reporter = null;
    this.issueProvider.issue.resolved = null;
    this.issueProvider.issue.sprint = null;
    this.issueProvider.issue.state = null;
    this.issueProvider.issue.title = null;
    this.issueProvider.issue.updated = null;
    this.issueProvider.issue.version = null;
    this.issueProvider.issue.watcher = null;
    this.issueProvider.issue.assignee = null;
    this.issueProvider.issue.avatar = null;
    this.issueProvider.issue.backlog = null;
    this.issueProvider.issue.created = null;
    this.issueProvider.issue.description = null;
    this.issueProvider.issue.enabled = true;
    this.issueProvider.issue.estimated = null;
    this.issueProvider.issue.label = null;
    this.issueProvider.issue.phase = null;
  }
}
