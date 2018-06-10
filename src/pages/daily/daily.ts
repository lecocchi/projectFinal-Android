import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DailyDescriptionPage} from '../daily-description/daily-description';
import {IDailyDescription} from '../../Interfaces/IDailyDescription';
import {DailyDescriptionProvider} from '../../providers/daily-description/daily-description';
import {DailyItemPage} from "../daily-item/daily-item";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
    selector: 'page-daily-tab',
    templateUrl: 'daily.html'
})
export class DailyPage {
    dailies: any = [{
        "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
        "date": new Date("2018-06-09 20:45:54")
    },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-08 20:45:54")
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-07 20:45:54")
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-06 20:45:54")
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-05 20:45:54")
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-04 20:45:54")
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date("2018-06-03 20:45:54")
        }];

    items: IDailyDescription[] = [];
    now:any;
    createAt:string;
    name:string = 'LEANDRO COCCHI';
    scrummaster:string = 'Leandro Cocchi';
    dailyPush: any;

    dailyItem:any = DailyItemPage;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public dailyDescriptionProvider: DailyDescriptionProvider,
                public utils: UtilsProvider) {
        this.items = dailyDescriptionProvider.items;
        this.dailyPush = DailyDescriptionPage;
        this.now = this.utils.traslatorLenguajeSpanish(new Date());
        this.createAt = `${this.now.dayWeek}, ${this.now.day} de ${this.now.month} de ${this.now.year}`;
    }

    push(position: number) {
        this.navCtrl.push(DailyDescriptionPage, {
            index: position
        })
    }

    createNewDaily(){
        this.navCtrl.push(this.dailyItem);
    }

    openDetail(daily:any){
        this.navCtrl.push(this.dailyItem);
    }

}
