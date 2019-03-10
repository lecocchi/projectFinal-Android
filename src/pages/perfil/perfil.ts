import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  firstName:string;
  lastName:string;
  role:string;
  email:string;
  isEnabled:boolean;
  userName:string;
  isNetwork:boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage:Storage,
              public alertCtrl: AlertController,
              public utilProvider: UtilsProvider,
              public userProvider: UserProvider) {

    this.storage.get("firstName").then((f)=>{
      this.firstName = f;
    });

    this.storage.get("lastName").then((l)=>{
      this.lastName = l;
    });

    this.storage.get("userName").then((u)=>{
      this.userName = u;
    });

    this.storage.get("rol").then((r)=>{
      if(r === '1')
        this.role = 'Desarrollador';
      else if(r === '2')
        this.role = 'Scrum master';
      else
        this.role = 'Admin';
    });

    this.storage.get("email").then((e)=>{
      this.email = e;
    });

    this.storage.get("isNetwork").then((n)=>{
      this.isNetwork = n;
    })

  }

  ionViewCanEnter(){ }

  accept(){
    console.log("Cambiar");
  }

  changePassword(){
    this.showConfirm();
  }


  showConfirm() {
    const prompt = this.alertCtrl.create({
      title: 'Contraseña',
      message: "Cambiar la contraseña",
      inputs: [
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nueva contraseña'
        },
        {
          name: 'repeatNewPassword',
          type: 'password',
          placeholder: 'Repetir la nueva contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Cambiar',
          handler: data => {
            if(data.newPassword != data.repeatNewPassword){
              this.utilProvider.presentPrompt("Error", "Las contraseñas no son iguales, por favor de intentar de nuevo");
            }else{
              let changePassword = {
                "email" : this.email,
                "password": data.newPassword
              }

              this.userProvider.changePassword(changePassword)
              .subscribe(
                (res) =>{
                   this.utilProvider.presentToast("Se cambió con exito la contraseña");
                },
                (err) => {
                  this.utilProvider.presentPrompt(err.error.title, err.error.message);
                }
              )
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
