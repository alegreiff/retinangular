import { Component, OnInit } from '@angular/core';
import { PeliculasStore } from './core/peliculas.store';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  nombre: string;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUlr$: Observable<string>;
  nombre$: Observable<string>;
  email$: Observable<string>;
  isVisible = false;
  constructor(private peliculasStore: PeliculasStore, private afAuth: AngularFireAuth, private ruta: Router){}
  ngOnInit(){
        this.peliculasStore.init();
        this.afAuth.authState.pipe(
          map(user => user ? user.displayName: null))
    .subscribe(nombre => this.nombre = nombre)
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user))
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn ))
    this.pictureUlr$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL: null))
    this.nombre$ = this.afAuth.authState.pipe(map(user => user ? user.displayName: null))
    this.email$ = this.afAuth.authState.pipe(map(user => user ? user.email: null))
    

        
        
  }

  logout() {
    this.afAuth.auth.signOut()
    this.ruta.navigateByUrl('/welcome')
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
}

