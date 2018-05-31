import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class LabelProvider {

  constructor(public http: HttpClient) { }

  getAllLabel(){
    return this.http.get(URL_BASE +"/label/");
  }

  createNewLabel(name:string, description:string){
    return this.http.post(
      URL_BASE+"/label/",
      {
        name:name,
        description:description
      });
  }

  updateLabel(id:number, name:string, description:string){

    return this.http.put(
      URL_BASE+"/label/"+id,
      {
        name:name,
        description:description
      });
  }

}
