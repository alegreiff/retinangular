import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario.component';






const routes: Routes = [
    { path: 'cal', component: CalendarioComponent}

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class CalendarioRoutingModule {

}