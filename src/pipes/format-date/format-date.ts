import { Pipe, PipeTransform } from '@angular/core';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the FormatDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
    now:any;
    createAt:string;
    constructor(public utils:UtilsProvider){}

    transform(value: Date, ...args) {

        this.now = this.utils.traslatorLenguajeSpanish(value);
        this.createAt = `${this.now.dayWeek}, ${this.now.day} de ${this.now.month} de ${this.now.year}`;

        return this.createAt;
    }
}
