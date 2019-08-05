import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { SprintProvider } from '../../providers/sprint/sprint';


@Component({
  selector: 'page-popover-backlog',
  templateUrl: 'popover-backlog.html',
})
export class PopoverBacklogPage {
  issue: IIssue;
  sprint: any;
  sprints: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public issueProvider: IssueProvider,
    public viewCtrl: ViewController,
    public utils: UtilsProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public utilProvider: UtilsProvider,
    public sprintProvider: SprintProvider) {

    this.sprint = this.navParams.get("sprint");

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

  sendToBacklog() {

    this.issue = this.viewCtrl.getNavParams().get("issue");

    if (this.issue.state != 'CREADO') {
      this.viewCtrl.dismiss();
      this.utilProvider.presentPrompt("Error", "Solamente se pueden enviar al backlog issues con estado 'CREADO'");

    } else {

      let loading = this.loadingCtrl.create(
        {
          spinner: 'ios',
          content: 'Procesando...'
        });
      loading.present();


      this.storage.get("projectId")
        .then((idProject) => {
          this.issue.idProject = idProject;
          this.issueProvider.addIssueInBacklog(this.issue)
            .subscribe((i: IIssue) => {
              this.viewCtrl.dismiss();
              loading.dismiss();
              this.utils.presentToast(`Se envió el issue al Backlog`);

            });
        })
    }
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
      });
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

        s.forEach(sp => {
          if (sp.name != this.sprint.name) {
            this.sprints.push(sp);
          }
        });

        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        this.utilProvider.presentPrompt("Error", "Error al intentar obtener los sprint disponibles");
      });
  }
}
