import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PeliculasStore } from 'src/app/core/peliculas.store';
import { IPais, IFilme } from 'src/app/models/filme';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {
  id: string;
  pais: IPais
  peliculas$: Observable<IFilme[]>;
  selectedItemId
  constructor(private route: ActivatedRoute, private ruta: Router, private peliculasStore: PeliculasStore) {
    
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pais = null
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.peliculasStore.validapais(this.route.snapshot.paramMap.get('id'))){
        this.pais = this.peliculasStore.validapais(this.route.snapshot.paramMap.get('id'))
        this.peliculas$ = this.peliculasStore.filtroPorPais(this.pais)
      }
      if (!this.pais) {
        this.ruta.navigateByUrl('/')
      }
      
    });


    
    
  }
  

  

}
