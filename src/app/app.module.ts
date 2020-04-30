import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
//import { NzLayoutModule } from 'ng-zorro-antd/layout';
//import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { LoadingComponent } from './shared/loading/loading.component';
import { PeliculasModule } from './components/peliculas/peliculas.module';
import { ZorroModule } from './zorro.module';
import { LoadingService } from './shared/loading/loading.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EstadisticasModule } from './components/estadisticas/estadisticas.module';
import { CalendarioModule } from './components/calendario/calendario.module';
registerLocaleData(es);

import { environment } from '../environments/environment'
import { AngularFireModule}  from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './shared/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    /* NzLayoutModule,
    NzMenuModule, */
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, PeliculasModule, ZorroModule, NgxChartsModule, EstadisticasModule, CalendarioModule, 
    AngularFirestoreModule, AngularFireModule.initializeApp(environment.configFirebase), AngularFireAuthModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, LoadingService],
  bootstrap: [AppComponent],
  exports:[
    ZorroModule]
})
export class AppModule { }
