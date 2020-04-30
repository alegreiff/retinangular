import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasComponent } from './peliculas.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ZorroModule } from 'src/app/zorro.module';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './detalle/detalle.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaisComponent } from './pais/pais.component';




@NgModule({
  declarations: [PeliculasComponent, DetalleComponent, PaisComponent],
  imports: [
    CommonModule, PeliculasRoutingModule, IconsProviderModule, ZorroModule, FormsModule, NgxChartsModule
  ]
})
export class PeliculasModule { }
