import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './core/pages/busqueda/busqueda.component';
import { FavoritoComponent } from './core/pages/favorito/favorito.component';
import { PreferenciaComponent } from './core/pages/preferencia/preferencia.component';
import { recetasDeComponent } from './core/pages/recetasDe/recetasDe.component';
import { CategoriaComponent } from './core/pages/categoria/categoria.component';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AppComponent},
  { path: '**', redirectTo: '' },
  {path:'categoria', canActivate:[AuthGuard], component:CategoriaComponent},
    {path:'favorito',canActivate:[AuthGuard], component:FavoritoComponent},
    {path:'preferencia', canActivate:[AuthGuard], component:PreferenciaComponent},
    {path:'recetasDe', canActivate:[AuthGuard], component: recetasDeComponent},
    { path: 'busqueda', canActivate:[AuthGuard], component: BusquedaComponent },
    //{ path: 'signup', component: SignupComponent},
    //{ path: 'errores', component: ErroresComponent}
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
