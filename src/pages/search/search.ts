import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { IssueProvider, IIssue } from '../../providers/issue/issue';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';
import { IssuePage } from '../issue/issue';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  issues: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public utilsProvider: UtilsProvider) {
  }

  ionViewDidEnter() {

    this.storage.get("projectId")
      .then((id: any) => {

        let loading = this.loadingCtrl.create(
          {
            spinner: 'ios',
            content: 'Cargando...'
          });
        loading.present();


        this.issueProvider.getAllIssuesByProject(id)
          .subscribe((i: IIssue) => {
            this.issues = i;
            loading.dismiss();
          },
            (err) => {
              loading.dismiss();
              this.utilsProvider.presentPrompt("Error", "Error al obtener los issues");
            })
      })

  }

  public getClassByState(state: string) {
    switch (state) {
      case 'CREADO':
        return 'created';

      case 'EN PROGRESO':
        return 'progress'

      case 'BLOQUEADO':
        return 'blocked';

      case 'FINALIZADO':
        return 'finished';

      default:
        break;
    }
  }

  openDetail(issue: IIssue) {
    this.navCtrl.push(IssuePage, { "issue": issue, "update": true });
  }

}
