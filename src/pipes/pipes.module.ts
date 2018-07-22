import { NgModule } from '@angular/core';
import { FormatDatePipe } from './format-date/format-local-date-time';
@NgModule({
	declarations: [FormatDatePipe],
	imports: [],
	exports: [FormatDatePipe]
})
export class PipesModule {}
