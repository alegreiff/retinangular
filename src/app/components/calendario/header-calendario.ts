import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { PeliculasStore } from 'src/app/core/peliculas.store';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  templateUrl: './header-calendario.html',
})
export class CalendarHeaderComponent implements OnInit{
  constructor(private peliculasStore: PeliculasStore){

  }
  ngOnInit(){
    this.minDate = new Date(this.peliculasStore.first)
    this.maxDate = new Date(this.peliculasStore.last)
  }
  minDate: Date;
  maxDate: Date;

  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'es';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
