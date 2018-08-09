import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

@Injectable()
export class SprintProvider {

  constructor(public http: HttpClient) { }

  getAllSprints(){
    return this.http.get(URL_BASE + "/sprint/");
  }

  createSprint(sprint:any){
    return this.http.post(URL_BASE + "/sprint/", sprint);
  }

}
