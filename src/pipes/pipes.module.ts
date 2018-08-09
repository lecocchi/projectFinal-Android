import { NgModule } from '@angular/core';
import { FormatDatePipe } from './format-date/format-date';
import { FormatDateMillisecondPipe } from './format-date-millisecond/format-date-millisecond';
@NgModule({
	declarations: [FormatDatePipe,
    FormatDateMillisecondPipe],
	imports: [],
	exports: [FormatDatePipe,
    FormatDateMillisecondPipe]
})
export class PipesModule {}
