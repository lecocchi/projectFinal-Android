import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SprintProvider {

  public sprints:any = [];

  constructor(public http: HttpClient) { }

  getAllSprints(){
    return this.http.get(URL_BASE + "/sprint/");
  }

  createSprint(sprint:any){
    return this.http.post(URL_BASE + "/sprint/", sprint);
  }

  getSprintById(id:string){
    return this.http.get(URL_BASE + "/sprint/" + id);
  }

  finishSprint(issue:any){
    return this.http.post(URL_BASE + "/sprint/finish", issue);
  }

}
