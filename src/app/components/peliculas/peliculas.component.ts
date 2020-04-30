import { Component, OnInit} from '@angular/core';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';




import * as _ from 'lodash';

import { map } from 'rxjs/operators';

import { PeliculasStore } from 'src/app/core/peliculas.store';
import { IFilme } from 'src/app/models/filme';
import { Observable } from 'rxjs';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
  ancho?: string;
}
@Component({
  selector: 'app-todas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {
  
  listOfColumns: ColumnItem[] = [
    {
      name: '#',
      ancho: '50px',
      sortOrder: 'ascend',
      sortFn: (a: IFilme, b: IFilme) => a.id - b.id,
    },
    {
      name: 'Película',
      ancho: '40%',
      sortOrder: null,
      sortFn: (a: IFilme, b: IFilme) => a.titulo.localeCompare(b.titulo),
      filterFn: (list: string[], item: IFilme) => list.some(titulo => item.titulo.indexOf(titulo) !== -1)
    },
    {
      name: 'Año',
      //ancho: '40',
      sortOrder: null,
      sortFn: (a: IFilme, b: IFilme) => a.year - b.year,
      //sortDirections: ['descend', null]
    },
    {
      name: 'País',
      ancho: '100px',
      sortOrder: null,
      sortFn: (a: IFilme, b: IFilme) => a.pais.localeCompare(b.pais),
      filterMultiple: false,
      listOfFilter: [
        { text: 'Bolivia', value: 'Bolivia' },
        { text: 'Colombia', value: 'Colombia' },
        { text: 'Ecuador', value: 'Ecuador' },
        { text: 'México', value: 'México' },
        { text: 'Perú', value: 'Perú' },
        { text: 'Uruguay', value: 'Uruguay' },
        
      ],
      //filterFn: (list: string[], item: IFilme) => list.some(pais => item.pais.indexOf(pais) !== -1)
      filterFn: (pais: string, item: IFilme) => item.pais.indexOf(pais) !== -1

      //filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)

    },{
      name: 'Días activa',
      ancho: '120px',
      sortOrder: 'descend',
      sortFn: (a: IFilme, b: IFilme) => a.sumdias - b.sumdias,
    },{
      name: 'Reproducciones',
      ancho: '120px',
      sortOrder: 'descend',
      sortFn: (a: IFilme, b: IFilme) => a.sumvisitas - b.sumvisitas,
    },{
      name: 'Detalles'
    }
  ];
  value: string;
  peliculas$: Observable<IFilme[]>;
  //buscadaspeliculas$: Observable<IFilme[]>;
  peliculas: IFilme[];
  nombre: string;
  constructor(public peliculasStore: PeliculasStore) {
    this.peliculas$ = this.peliculasStore.peliculas$;
    const filme$ = this.peliculasStore.peliculas$
    .pipe(
      map( datos =>  datos)
    )
    filme$.subscribe((data) => {
      this.peliculas = data
      
    })
      }


    filtroTitulo(texto: string){
    this.peliculas$ = this.peliculasStore.filtroPorTitulo(texto)
  }



  /* listOfDisplayData: IFilme[]
  if(peliculas){
    this.listOfDisplayData = [...peliculas];
  } 
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    console.log("FF", this.listOfDisplayData.length)
    console.log("MM", this.peliculas.length)
    this.visible = false;
    this.listOfDisplayData = this.peliculas.filter((item: IFilme) => item.titulo.indexOf(this.searchValue) !== -1);
    console.log("POSFF", this.listOfDisplayData.length)
    console.log("POMM", this.peliculas.length)
  } */
  ngOnInit() {
    

  }



  


}

