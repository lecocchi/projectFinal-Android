import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, PopoverController, LoadingController } from 'ionic-angular';
import { IssueProvider, IIssue } from "../../providers/issue/issue";
import { UtilsProvider } from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';
import { SprintProvider } from '../../providers/sprint/sprint';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  issue: IIssue;
  sprints: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public issueProvider: IssueProvider,
    public utils: UtilsProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public utilProvider: UtilsProvider,
    public sprintProvider: SprintProvider) {

    this.storage.get("projectId")
      .then((id: any) => {
        this.getSprintsActivedAndCreated(id);
      })
  }

  sendToSprint(sprint: any) {

    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();

    this.issue = this.viewCtrl.getNavParams().get("issue");

    this.storage.get("projectId")
      .then((idProject) => {
        this.issue.idProject = idProject;
        this.issue.sprint = sprint.id;
        this.issueProvider.sendIssueToSprint(this.issue)
          .subscribe((i: IIssue) => {
            loading.dismiss();
            this.viewCtrl.dismiss();
            this.utils.presentToast(`Se envió el issue al ${sprint.name}`);
          },
            (err) => {
              loading.dismiss();
              this.utilProvider.presentPrompt(err.error.title, err.error.message);
              this.viewCtrl.dismiss();
            }
          );
      }
      );
  }

  delete() {
    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();

    this.issue = this.viewCtrl.getNavParams().get("issue");
    this.issueProvider.deleteIssue(this.issue.id)
      .subscribe((i: IIssue) => {
        loading.dismiss();
        this.viewCtrl.dismiss();
        this.utils.presentToast(`Se eliminó el issue SID-${i.id}`);
      },
        (err) => {
          loading.dismiss();
          this.viewCtrl.dismiss();
          this.utilProvider.presentPrompt(err.error.title, err.error.message);
        }
      );
  }

  getSprintsActivedAndCreated(idProject: any) {

    let loading = this.loadingCtrl.create(
      {
        spinner: 'ios',
        content: 'Procesando...'
      });
    loading.present();

    this.sprintProvider.getSprintsActivedAndCreated(idProject)
      .subscribe((s: any) => {
        this.sprints = s;
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        this.utilProvider.presentPrompt("Error", "Error al intentar obtener los sprint disponibles");
      });
  }

}
