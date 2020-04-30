import { Component, OnInit } from '@angular/core';
import { PeliculasStore } from 'src/app/core/peliculas.store';
import { Observable } from 'rxjs';
import { IEstadistica } from 'src/app/models/estadistica';
import * as moment from 'moment'; 
import 'moment/locale/es';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Cinco años de Retina Latina';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';
  //
  datosbase: any[];
  losdatos: IEstadistica[];
  estadistica$: Observable<IEstadistica[]>

  colorScheme = {};
  constructor(private peliculasStore: PeliculasStore) { 
    this.colorScheme = peliculasStore.colorScheme;
  }
  muestra = false;
  ngOnInit(): void {
    this.estadistica$ = this.peliculasStore.estadistica$

    this.peliculasStore.estadistica$
      .subscribe(
        respuesta => {
          this.losdatos = respuesta;
          this.datosGrafica('sesiones')
        }
        //e => this.losdatos = e
      )
  }

  datosGrafica(campo: string) {
    const datos =
      this.peliculasStore.meses.map((m) => {
        const internos = this.datointerno(campo, m)
        return {
          name: moment().month(m -1).format("MMM"), series: 
          internos
        }
      })
    this.yAxisLabel = campo
    this.datosbase = datos;
    this.muestra = true;
  }

  datointerno(campo: string, mes: number){
    let salida = []
      for (let year of this.peliculasStore.years){
        salida.push({ name: year, value: (this.visitasKaltura(campo, year, mes))})
     }
    return salida;
  }

  visitasKaltura(campo: string, year: number, mes: number) {
    const sale = (this.losdatos.find(e => e.year == year && e.mes == mes))
    if (sale) {
      return sale[campo]
    } else {
      return 0
    }
}
}
