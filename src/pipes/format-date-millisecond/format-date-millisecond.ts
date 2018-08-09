import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateMillisecond',
})
export class FormatDateMillisecondPipe implements PipeTransform {

  transform(value: string, ...args) {
    let date:Date = new Date(value);

    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
}
