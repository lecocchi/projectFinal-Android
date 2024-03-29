import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from "../../components/config/config";


@Injectable()
export class IssueProvider {
  issue = {} as IIssue;
  issueToUpdate = {} as IIssue;

  constructor(public http: HttpClient) {
    this.issueToUpdate.reporter = 'Leandro Cocchi';
  }

  getAllIssueActiveSprint() {
    return this.http.get(URL_BASE + "/issue/active-sprint");
  }

  getAllIssueBacklog(projectId: number) {
    return this.http.get(URL_BASE + "/issue/backlog/projects/" + projectId);
  }

  getIssueById(id: number) {
    return this.http.get(URL_BASE + "/issue/" + id);
  }

  createNewIssue(issue: any) {
    return this.http.post(URL_BASE + "/issue/", issue);
  }

  updateIssue(issue: any, id: number) {
    return this.http.put(URL_BASE + "/issue/" + id, issue);
  }

  sendIssueToSprint(issue: IIssue) {
    return this.http.post(URL_BASE + "/issue/sprint/", issue);
  }

  addIssueInBacklog(issue: IIssue) {
    return this.http.patch(URL_BASE + "/issue/sprint/issues/backlog", issue);
  }

  deleteIssue(id: number) {
    return this.http.delete(URL_BASE + "/issue/" + id);
  }

  getIssueBySprintId(id: number) {
    return this.http.get(URL_BASE + "/issue/issues/" + id);
  }

  getAllIssueOpenInActiveSprint(idProject: number) {
    return this.http.get(URL_BASE + "/issue/open/projects/" + idProject);
  }

  getAllIssuesByProject(idProject: number) {
    return this.http.get(URL_BASE + '/issue/projects/' + idProject);
  }

  getStatusSprint(nameSprint: string, idProject: number) {
    return this.http.get(URL_BASE + "/issue/sprints/ " + nameSprint + "/status/projects/" + idProject);
  }

}

export interface IIssue {
  assignee: string;
  avatar: string;
  backlog: boolean;
  created: number;
  description: string;
  enabled: boolean;
  estimated: number;
  id: number;
  label: string;
  phase: string;
  plannedEnd: number;
  plannedStart: number;
  priority: string;
  remaining: number
  reporter: string;
  resolved: number;
  sprint: number;
  state: string;
  title: string;
  updated: number
  version: string;
  watcher: string;
  idProject: number;
}
