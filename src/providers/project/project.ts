import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../../components/config/config';

@Injectable()
export class ProjectProvider {

  constructor(public http: HttpClient) { }

  getAllProjects(){
    return this.http.get(URL_BASE + "/projects");
  }

  createProject(project:any){
    return this.http.post(URL_BASE + "/projects", project);
  }

  updateProject(project:any){
    return this.http.patch(URL_BASE + "/projects", project);
  }

  updateUsersInProject(users:any){
    return this.http.patch(URL_BASE + "/projects/users" , users);
  }

}
