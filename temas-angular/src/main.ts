import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { TemasComponent } from './app/temas/temas.component';
import { AprendicesComponent } from './app/aprendices/aprendices.component';
import { TemaAprendizComponent } from './app/tema-aprendiz/tema-aprendiz.component';

import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/api/v1/temas', pathMatch: 'full' },
  { path: 'api/v1/temas', component: TemasComponent },
  { path: 'api/v1/aprendices', component: AprendicesComponent },
  { path: 'api/v1/tema-aprendiz', component: TemaAprendizComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding()),
  ],
}).catch(err => console.error(err));
