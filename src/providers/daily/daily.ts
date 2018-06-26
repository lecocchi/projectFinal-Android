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


  dailyDetails:any[] = [
    {
      "id": 1,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 2,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 3,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 4,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 5,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 6,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 7,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    },
    {
      "id": 8,
      "daily_id": 1,
      "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
      "first_name": "Leandro",
      "last_name": "Cocchi",
      "rol": "Scrummaster",
      "today": "Lo que va a hacer en el dia de hoy",
      "yesterday": "Lo que hizo ayer"
    }
  ];

  constructor(public http: HttpClient) {  }

  getAllDailies(){
    return this.dailies;
  }

  getDetailDailyByDailyId(daily_id: number): any{

    let detailByDailyId:any[] = [];

    for (let detail of this.dailyDetails){
      if (detail.daily_id == daily_id){
        detailByDailyId.push(detail);
      }
    }
    return detailByDailyId;
  }

}
