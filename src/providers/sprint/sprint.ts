import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from "../../components/config/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SprintProvider {

  public sprints: any = [];
  public sprintType: string;

  constructor(public http: HttpClient) { }

  getAllSprintsByProject(idProject: number) {
    return this.http.get(URL_BASE + "/sprint/projects/" + idProject);
  }

  createSprint(sprint: any) {
    return this.http.post(URL_BASE + "/sprint/", sprint);
  }

  getSprintById(id: string) {
    return this.http.get(URL_BASE + "/sprint/" + id);
  }

  finishSprint(sprint: any) {
    return this.http.post(URL_BASE + "/sprint/finish", sprint);
  }

  deleteSprint(idSprint: number, idProject: number) {
    return this.http.delete(URL_BASE + "/sprint/" + idSprint + "/projects/" + idProject);
  }

  velocityChart(idProject: number) {
    return this.http.get(URL_BASE + "/sprint/velocity/projects/" + idProject);
  }

  sprintReportsByProject(idProject: number) {
    return this.http.get(URL_BASE + "/sprint/sprint-report/projects/" + idProject);
  }

  sprintActive(idProject: number) {
    return this.http.get(URL_BASE + "/sprint/active/projects/" + idProject);
  }

  activedSprint(sprint: any) {
    return this.http.post(URL_BASE + "/sprint/active", sprint);
  }

  getSprintsActivedAndCreated(idProject: number) {
    return this.http.get(URL_BASE + '/sprint/availables/projects/' + idProject);
  }

}
