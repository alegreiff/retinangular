import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas.component';
import { MapaComponent } from './mapa/mapa.component';





const routes: Routes = [
    {path: 'estadisticas', component: EstadisticasComponent},
    {path: 'mapa', component: MapaComponent}

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class EstadisticasRoutingModule {

}