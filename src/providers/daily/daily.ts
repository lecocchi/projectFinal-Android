import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DailyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DailyProvider {

    dailies: any = [
        {
            "id": 1,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-09 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 2,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-08 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 3,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-07 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 4,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-06 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 5,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-05 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 6,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-04 20:45:54"),
            "create": "Leandro Cocchi"
        },
        {
            "id": 7,
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-03 20:45:54"),
            "create": "Leandro Cocchi"
        }];

  constructor(public http: HttpClient) {  }

  getAllDailies(){
      return this.dailies;
  }

}
