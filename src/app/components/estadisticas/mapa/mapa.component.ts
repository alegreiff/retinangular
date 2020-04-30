import { Component, OnInit } from '@angular/core';
import { PeliculasStore } from 'src/app/core/peliculas.store';
import { Observable } from 'rxjs';
import { IPais } from 'src/app/models/filme';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  paises$: Observable<IPais[]>
  constructor (private peliculasStore: PeliculasStore) {
    
  }
  options = {
    displayMode: 'region',
    legend: {
    textStyle: {
    color: 'red',
    fontSize: 16,
    bold: true
    }
    },
    magnifyingGlass: {
    enable: true,
    zoomFactor: 2.5
    },
    tooltip: {
    textStyle: {
    color: '#5ac4ee',
    showColorCode: true
    }
    },
    region: 'world',
    colorAxis: {
    colors: ['#eeeeee', '#ed347d']
    },
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#fff'
    }
    config = {firstRowAsData : true}
  /* options = {
    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#f8bbd0',
    defaultColor: '#f5f5f5',
    region: 'world',
    legend: {
      textStyle: {
        color: '#ed347d',
        fontSize: 32,
        bold: true
      }
    }
  }; */
  myType = 'GeoChart';
  myData = [
    ['Timor-Leste', 333],
    ['Yemen', 300],
    ['Suriname', 400]
    
    
    ];
  

  ngOnInit(): void {
    this.paises$ = this.peliculasStore.paises$;
  }
mostra(e){
console.log("DATOS", e)
}
}
