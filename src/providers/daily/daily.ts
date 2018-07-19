import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";


@Injectable()
export class DailyProvider {

  daily:any;

  constructor(public http: HttpClient) {  }

  getAllDailies(): any{
    return this.http.get(URL_BASE + "/daily/");
  }

  getDetailDailyByDate(date: Date): any{

  }

  createDaily(): any{
    return this.http.post(URL_BASE + "/daily/", this.daily);
  }

}
