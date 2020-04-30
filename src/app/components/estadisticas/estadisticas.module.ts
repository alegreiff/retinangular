import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { ZorroModule } from 'src/app/zorro.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule, EstadisticasRoutingModule, ZorroModule, NgxChartsModule
  ]
})
export class EstadisticasModule { }
