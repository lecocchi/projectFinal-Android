import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SprintProvider {

  public sprints:any = [];

  constructor(public http: HttpClient) { }

  getAllSprintsByProject(idProject:number){
    return this.http.get(URL_BASE + "/sprint/projects/" + idProject);
  }

  createSprint(sprint:any){
    return this.http.post(URL_BASE + "/sprint/", sprint);
  }

  getSprintById(id:string){
    return this.http.get(URL_BASE + "/sprint/" + id);
  }

  finishSprint(sprint:any){
    return this.http.post(URL_BASE + "/sprint/finish", sprint);
  }

  velocityChart(){
    return this.http.get(URL_BASE + "/sprint/velocity")
  }

  sprintReports(){
    return this.http.get(URL_BASE + "/sprint/sprint-report");
  }

  sprintActive(){
    return this.http.get(URL_BASE + "/sprint/active");
  }

}
