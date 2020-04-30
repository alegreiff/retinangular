import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IFilme } from 'src/app/models/filme';
import { PeliculasStore } from 'src/app/core/peliculas.store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  id: number;
  res: Observable<IFilme>;
  botonactivo: string;
  /* */

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Año / mes';
  yAxisLabel = 'Reproducciones';
  legend = false;
  colorScheme = {};
  oficial: any[];
  graficafechas: any[];
  graficafechasY: any[];
  last: string;
  /* */
  constructor(private route: ActivatedRoute, private ruta: Router, private peliculasStore: PeliculasStore) {
    this.colorScheme = peliculasStore.colorScheme;
   }

  ngOnInit() {
    
    this.id = + this.route.snapshot.paramMap.get('id');
    this.res = this.peliculasStore.muestraPelicula(this.id)
    this.last = this.peliculasStore.last
    if (!this.res) {
      this.ruta.navigateByUrl('/peliculas')
    }
    this.peliculasStore.muestraPelicula(this.id)
      .pipe(
        map(datos => datos)
      ).subscribe(data => {
        let salida = []
        let salidayears = []
        const years = this.peliculasStore.years
        if (data) {
          for (let item of data.visitas) {
            salida.push({ 'name': item.year + '/' + item.month, 'value': item.visitas })
          }
          for (let year of years) {
            salidayears.push({ name: year, 'value': _.sumBy(data.visitas.filter(e => e.year === year), 'visitas') })
          }
          this.graficafechas = salida;
          this.graficafechasY = salidayears;
          this.oficial = this.graficafechas;
          this.botonactivo='mes'
        }
      }
      )

  }
  mes() {
    console.log('MES')
    this.botonactivo='mes'
    this.oficial = this.graficafechas;
  }
  year() {
    console.log('YIAR')
    this.botonactivo='year'
    this.oficial = this.graficafechasY;
  }
  onSelect(event) {
    console.log(event);
  }
  temporadas(temporadas){
    return temporadas.length;
  }


}
