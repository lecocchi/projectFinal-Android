import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {VersionsProvider} from "../../providers/versions/versions";
import {UtilsProvider} from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-version-description',
  templateUrl: 'version-description.html',
})
export class VersionDescriptionPage {

  title:string = 'Crear una nueva versión';
  version:any;
  id:number;
  name:string;
  description:string;
  readonly:boolean = false;
  update:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public versionProvider: VersionsProvider, public utils:UtilsProvider,
              public storage:Storage) {

    this.update = this.navParams.get('update')

    if( this.update == true){
      this.version = this.navParams.get('version');
      this.id = this.version.id;
      this.name = this.version.name;
      this.description = this.version.description;
      this.title = `Editar versión ${this.name}`;
      this.readonly = true;
    }
  }

  accept(){

    if (this.utils.isEmpty(this.name)){
      this.utils.presentToast('El nombre no puede estar vacío');
    }else if (this.utils.isEmpty(this.description)){
      this.utils.presentToast('La descripción no puede estar vacía');
    }else {


      this.storage.get("projectId")
        .then(idProject => {
          if (this.update){
            this.versionProvider.updateVersion(this.id, this.name, this.description, idProject)
              .subscribe(
                (data) => {
                  this.navCtrl.pop();
                  this.utils.presentToast(`Se modificó la versión ${this.name} con éxito`);
                }
              );

          } else {
            this.versionProvider.createNewVersion(this.name, this.description, idProject)
              .subscribe(
                (data) => {
                  this.navCtrl.pop();
                  this.utils.presentToast(`Se creó la versión ${this.name} con éxito`);
                }
              );
          }
        });
    }
  }
}
