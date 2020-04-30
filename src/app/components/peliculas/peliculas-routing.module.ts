import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PaisComponent } from './pais/pais.component';




const routes: Routes = [
    
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'peliculas/:id', component: DetalleComponent},
    { path: 'pais/:id', component: PaisComponent}
    
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class PeliculasRoutingModule {

}