import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from './colors';
import { PeliculasStore } from 'src/app/core/peliculas.store';
import { IFecha } from 'src/app/models/fechas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFilme } from 'src/app/models/filme';
import { LoadingService } from '../../shared/loading/loading.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from 'date-fns';
registerLocaleData(localeEs);

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarioComponent implements OnInit {
  //pelione: Observable<IFilme>
  fechas$: Observable<IFecha[]>
  //@Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  //minDate: Date = subMonths(new Date(), 1);
  //maxDate: Date = addMonths(new Date(), 1);
  minDate: Date;
  maxDate: Date;
  view: CalendarView = CalendarView.Month;
  viewDate: Date;
  nuevoseventos: CalendarEvent[];
  events: CalendarEvent[] = [
    {
      title: 'Click me',
      color: colors.yellow,
      start: new Date(),
    },
    {
      title: 'Or click me',
      color: colors.blue,
      start: new Date(),
    },
  ];
  constructor(private peliculasStore: PeliculasStore, private loading: LoadingService) {
    
    //this.pelione = this.peliculasStore.muestraFILM(1)
    this.dateOrViewChanged();
   }

  ngOnInit() {
    //this.peliculasStore.init();
    this.viewDate = new Date(this.peliculasStore.last)
    this.minDate = new Date(this.peliculasStore.first)
    this.maxDate = addDays(new Date(this.peliculasStore.last), 1)
    const fechas = this.peliculasStore.fechas$
    .pipe(
      map(fechas => fechas)
    )
  fechas.subscribe(
    fechas => {
      if(fechas){
        this.nuevoseventos = this.creaFechas(fechas);
      }
      
    }
  )

  }
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }
  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        console.log("El mes cambia. Cambia tu")
        day.cssClass = 'cal-disabled';
      }
    });
  }
  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }


  tituloPelicula(id: number): string{
    let filme: IFilme
    
    const filme$ = this.peliculasStore.muestraPelicula(id)
    .pipe(
      map( datos =>  datos)
    )
    filme$.subscribe((data) => filme = data)
    return filme.titulo
    /* return this.peliculasStore.muestraFILM(id).pipe(
      map(a => a.titulo )
    ) */
  }

  creaFechas(fechas: IFecha[]){
    if(fechas.length > 0){
      console.log('SISAS', fechas.length)
      let salida = [];
    for(let item of fechas){
      
      salida.push({
      title: 'Ingreso: '+this.tituloPelicula(item.PeliculaId),
      color: colors.yellow,
      start: new Date(item.entrada),
      })
      if(item.salida){
        salida.push({
          title: 'Salida: ' + this.tituloPelicula(item.PeliculaId),
          color: colors.red,
          start: new Date(item.salida),
          })
      }
    }
    
    
    return salida
    }
    else{
      return [];
    }
    
  }
}
