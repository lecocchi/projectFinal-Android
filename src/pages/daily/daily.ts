import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DailyDescriptionPage } from '../daily-description/daily-description';
import { IDailyDescription } from '../../Interfaces/IDailyDescription';
import { DailyDescriptionProvider } from '../../providers/daily-description/daily-description';
import {DailyItemPage} from "../daily-item/daily-item";

@Component({
    selector: 'page-daily-tab',
    templateUrl: 'daily.html',
})
export class DailyPage {
    dailies: any = [{
        "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
        "date": new Date().toDateString()
    },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date().toDateString()
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date().toDateString()
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date().toDateString()
        },
        {
            "avatar":"http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg",
            "date": new Date().toDateString()
        }];

    items: IDailyDescription[] = [];
    createAt = new Date();
    scrummaster:string = 'Leandro Cocchi';
    dailyPush: any;

    dailyItem:any = DailyItemPage;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public dailyDescriptionProvider: DailyDescriptionProvider) {
        this.items = dailyDescriptionProvider.items;
        this.dailyPush = DailyDescriptionPage;

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
