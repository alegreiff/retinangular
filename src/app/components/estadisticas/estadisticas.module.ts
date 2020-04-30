import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { ZorroModule } from 'src/app/zorro.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MapaComponent } from './mapa/mapa.component';
import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [EstadisticasComponent, MapaComponent],
  imports: [
    CommonModule, EstadisticasRoutingModule, ZorroModule, NgxChartsModule, GoogleChartsModule.forRoot(),
  ]
})
export class EstadisticasModule { }
