import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from 'src/app/zorro.module';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';
import { CalendarHeaderComponent } from './header-calendario';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';




@NgModule({
  declarations: [CalendarioComponent, CalendarHeaderComponent],
  imports: [
    CommonModule, ZorroModule, 
    CalendarioRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CalendarioModule { }
