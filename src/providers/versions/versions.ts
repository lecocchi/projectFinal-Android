import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class VersionsProvider {

  constructor(public http: HttpClient) { }

  getAllVersion(idProject:number){
    return this.http.get(URL_BASE +"/version/projects/" + idProject);
  }

  createNewVersion(name:string, description:string, idProject:number){

    return this.http.post(
      URL_BASE+"/version/",
      {
        name:name,
        description:description,
        idProject: idProject
      });
  }

  updateVersion(id:number, name:string, description:string, idProject:number){

    return this.http.put(
      URL_BASE+"/version/"+id,
      {
        name:name,
        description:description,
        idProject: idProject
      });
  }

}
