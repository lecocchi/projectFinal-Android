import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_BASE} from "../../components/config/config";

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  constructor(public http: HttpClient) { }

  now():any{
    return this.http.get(URL_BASE + "/date/now");
}

}
