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
          console.log(data);

          resolve();
      })
    })
  }

}
