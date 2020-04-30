import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFilme, IPais } from '../models/filme';
import { map, tap } from 'rxjs/operators';
import { LoadingService } from '../shared/loading/loading.service';
import { asignardatos, limpiarfechas, endOfMonth, creaActividadFechas } from './pelicula.asignardatos'
import { IEstadistica } from '../models/estadistica';
import { IFecha } from '../models/fechas';

@Injectable({
    providedIn: 'root'
})

export class PeliculasStore {
    constructor(private http: HttpClient, private loading: LoadingService) {
        
    }

    

    /* Datos globales */
    meses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    years: number[] = [2016, 2017, 2018, 2019, 2020]
    first: string = '2016-03-04'
    last: string = endOfMonth;
    paises: IPais[] = [

        {nombre: 'Colombia', url: 'co', tipo: 1},
        {nombre: 'Argentina', url: 'ar', tipo: 0},
        {nombre: 'Bolivia', url: 'bo', tipo: 1},
        {nombre: 'Brasil', url: 'br', tipo: 0},
        {nombre: 'Chile', url: 'ch', tipo: 0},
        {nombre: 'Costa Rica', url: 'cr', tipo: 0},
        {nombre: 'Cuba', url: 'cu', tipo: 0},
        {nombre: 'Ecuador', url: 'ec', tipo: 1},
        {nombre: 'Guatemala', url: 'gu', tipo: 0},
        {nombre: 'México', url: 'mx', tipo: 1},
        {nombre: 'Paraguay', url: 'py', tipo: 0},
        {nombre: 'Perú', url: 'pe', tipo: 1},
        {nombre: 'República Dominicana', url: 'rd', tipo: 0},
        {nombre: 'Uruguay', url: 'uy', tipo: 1},
        {nombre: 'Venezuela', url: 've', tipo: 0},
    ]
    colorScheme = {
        domain: ['#810d70', '#BC2667', '#E55559', '#FD8A4E', '#FFC151', '#F9F871']
      };
    actividadFechas: any[]

    private subject = new BehaviorSubject<IFilme[]>([]);
    peliculas$: Observable<IFilme[]> = this.subject.asObservable();
    private subjectEstadistica = new BehaviorSubject<IEstadistica[]>([]);
    estadistica$: Observable<IEstadistica[]> = this.subjectEstadistica.asObservable();
    private subjectFechas = new BehaviorSubject<IFecha[]>([])
    fechas$: Observable<IFecha[]> = this.subjectFechas.asObservable();


    private apiserver: string = 'http://js.presencia.co/';

    private cargaAllPeliculas() {

        const cargaPeliculas$ = this.http.get<IFilme[]>(`${this.apiserver}peliculas`)

            .pipe(
                map(datos =>
                    asignardatos(datos)
                ),
                tap(peliculas => this.subject.next(peliculas)),

            );
        this.loading.showLoaderUntilCompleted(cargaPeliculas$)
            .subscribe()
    }

    
    public init(){
        this.cargaAllPeliculas();
        this.cargaEstadisticas();
        this.cargaFechas();
    }
    private cargaEstadisticas() {

        const cargaEstad$ = this.http.get<IEstadistica[]>(`${this.apiserver}estadisticas`)
            .pipe(
                map(datos => datos),
                tap(estadisticas => this.subjectEstadistica.next(estadisticas))
            );
        this.loading.showLoaderUntilCompleted(cargaEstad$)
            .subscribe()
    }

    private cargaFechas() {
        const cargaFechas$ = this.http.get<IFecha[]>(`${this.apiserver}fechas`)
            .pipe(
                map(fechas => 
                    limpiarfechas(fechas)
                    
                ),
                tap(fechas => {
                    this.subjectFechas.next(fechas)
                    //, this.actividadFechas=creaActividadFechas(this.first, this.last, fechas)
                })
            );
        this.loading.showLoaderUntilCompleted(cargaFechas$)
            .subscribe()
    }

    estadisticasYear(year: number): Observable<IEstadistica[]> {
        const salida = this.estadistica$.pipe(
            map(datos => datos.filter(m => m.year == year))
        )
        return salida;
    }

    filtroPorTitulo(textobuscado: string): Observable<IFilme[]> {
        return this.peliculas$.pipe(map(datos => datos
            .filter(pelicula => pelicula.titulo
                .toLowerCase()
                .includes(textobuscado
                    .toLowerCase()
                )
            )
        )
        );
    }
    filtroPorPais(pais: IPais): Observable<IFilme[]> {
        return this.peliculas$.pipe(map(datos => datos
            .filter( peli => peli.pais === pais.nombre)
        )
        );
    }
    validapais(url: string):IPais{
        return this.paises.find( pais => pais.url === url )
    }

    muestraPelicula(id: number): Observable<IFilme> {
        return this.peliculas$
            .pipe(
                map(pelicula =>
                    pelicula.find(peli => peli.id === id)
                )
            )
    }

    muestraFILM(id: number): Observable<IFilme> {
        //let y
        return this.peliculas$
        .pipe(
            map(pelicula =>
                pelicula.find(peli => peli.id === id)
            )
        )
        
        /* .subscribe(data => {
            y = data
        }) */
        
        

    
    }


}