import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, private afDB: AngularFirestore) { }

  getAllUser(){
      return this.http.get(URL_BASE + "/user/" );
  }

  verificaUsuario(clave: string){
    clave = clave.toLowerCase();
    return new Promise((resolve, reject) => {
      this.afDB.collection('tesis').doc('users')
        .valueChanges().subscribe( data =>{

          resolve();
      })
    })
  }

  createUser(user:any){
    return this.http.post(URL_BASE + "/user/", user);
  }

  updateUser(user:any){
    return this.http.put(URL_BASE + "/user/" + user.id, user);
  }


  loginForUserAndPass(userLogin:any){
    return this.http.post(URL_BASE + "/user/login-mail", userLogin);
  }

  changePassword(changePassword: any){
    return this.http.patch(URL_BASE + "/user/password", changePassword);
  }

  loginForGooglePlus(userLoginGooglePlus:any){
    return this.http.post(URL_BASE + "/user/google-plus", userLoginGooglePlus);
  }

  getProjectsByUserId(id:number){
    return this.http.get(URL_BASE + "/user/projects/" + id);
  }

  getAllProjects(){
    return this.http.get(URL_BASE + "/user/projects");
  }

  getUserByProject(id:number){
    return this.http.get(URL_BASE + "/user/project/" + id);
  }

}
