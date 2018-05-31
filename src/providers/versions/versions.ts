import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

/*
  Generated class for the VersionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VersionsProvider {

  constructor(public http: HttpClient) { }

  getAllVersion(){
    return this.http.get(URL_BASE +"/version/");
  }

  createNewVersion(name:string, description:string){
    return this.http.post(
      URL_BASE+"/version/",
      {
        name:name,
        description:description
      });
  }

  updateVersion(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/version/"+id,
      {
        name:name,
        description:description
      });
  }

}
