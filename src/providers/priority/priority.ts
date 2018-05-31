import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class PrioritiesProvider {

  constructor(public http: HttpClient) { }

  getAllPriority(){
    return this.http.get(URL_BASE +"/priority/");
  }

  createNewPriority(name:string, description:string){
    return this.http.post(
      URL_BASE+"/priority/",
      {
        name:name,
        description:description
      });
  }

  updatePriority(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/priority/"+id,
      {
        name:name,
        description:description
      });
  }
}
