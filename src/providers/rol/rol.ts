import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class RolProvider {

  constructor(public http: HttpClient) { }

  getAllRol(){
    return this.http.get(URL_BASE +"/rol/");
  }

  createNewRol(name:string, description:string){
    return this.http.post(
      URL_BASE+"/rol/",
      {
        name:name,
        description:description
      });
  }

  updateRol(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/rol/"+id,
      {
        name:name,
        description:description
      });
  }

}
