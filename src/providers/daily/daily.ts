import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DailyProvider {

  daily:any;

  constructor(public http: HttpClient) {  }

  getAllDailies(){

  }

  getDetailDailyByDate(date: Date): any{

  }

}
