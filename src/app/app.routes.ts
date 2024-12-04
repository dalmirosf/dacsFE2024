import { Routes } from '@angular/router';
import { FavoritoComponent } from './core/pages/favorito/favorito.component';
import { CategoriaComponent } from './core/pages/categoria/categoria.component';
import { PreferenciaComponent } from './core/pages/preferencia/preferencia.component';
import { recetasDeComponent } from './core/pages/recetasDe/recetasDe.component';
import { BusquedaComponent } from './core/pages/busqueda/busqueda.component'; 
import { SignupComponent } from './core/pages/signup/signup.component';
import { ErroresComponent } from './core/pages/errores/errores.component';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AuthGuard } from './core/guard/auth.guard';


export const routes: Routes = [
    {path:'categoria', canActivate:[AuthGuard], component:CategoriaComponent},
    {path:'favorito', component:FavoritoComponent},
    {path:'preferencia', component:PreferenciaComponent},
    {path:'recetasDe', component: recetasDeComponent},
    { path: 'busqueda', component: BusquedaComponent },
   { path: 'errores', component: ErroresComponent},
   //{ path: '**', redirectTo:''}
];