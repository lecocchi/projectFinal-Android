import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class PhaseProvider {

  constructor(public http: HttpClient) { }

  getAllPhase(){
    return this.http.get(URL_BASE +"/phase/");
  }

  createNewPhase(name:string, description:string){
    return this.http.post(
      URL_BASE+"/phase/",
      {
        name:name,
        description:description
      });
  }

  updatePhase(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/phase/"+id,
      {
        name:name,
        description:description
      });
  }

}
