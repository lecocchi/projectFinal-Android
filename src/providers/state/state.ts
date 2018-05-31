import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class StateProvider {

  constructor(public http: HttpClient) { }

  getAllState(){
    return this.http.get(URL_BASE +"/state/");
  }

  createNewState(name:string, description:string){
    return this.http.post(
      URL_BASE+"/state/",
      {
        name:name,
        description:description
      });
  }

  updateState(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/state/"+id,
      {
        name:name,
        description:description
      });
  }

}
