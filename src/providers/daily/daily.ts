import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from "../../components/config/config";


@Injectable()
export class DailyProvider {

  daily: any;

  constructor(public http: HttpClient) { }

  getAllDailiesByProject(idProject: number): any {
    return this.http.get(URL_BASE + "/daily/projects/" + idProject);
  }

  createDaily(): any {

    delete this.daily.created_at;
    this.daily.daily_items.forEach(item => {
      delete item.created_at;
    });

    return this.http.post(URL_BASE + "/daily/", this.daily);
  }

  isThereDailyToday(idProject: number): any {
    return this.http.get(URL_BASE + "/daily/today/projects/" + idProject);
  }

  sendMail(dailyId: string) {
    return this.http.post(URL_BASE + "/daily/" + dailyId + "/mail/", null);
  }

}
