import { Pipe, PipeTransform } from '@angular/core';
import {UtilsProvider} from "../../providers/utils/utils";


@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
    now:any;
    createAt:string;
    constructor(public utils:UtilsProvider){}

    transform(value: Date, ...args) {
        this.now = this.utils.traslatorLenguajeSpanish(value);
        this.createAt = `${this.now.dayWeek}, ${this.now.day} de ${this.now.month}`;

        return this.createAt;
    }
}
