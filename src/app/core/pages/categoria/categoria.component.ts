import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CategoriaComponent {
  constructor(private router: Router, private categoriaService: CategoriaService) {}

  buscarCategoria(categoria: string): void {
    // Carga las preferencias del localStorage
    const savedPreferences = JSON.parse(localStorage.getItem('preferencias') || '{}');
    const dietas = savedPreferences.dietas || [];
    const intolerancias = savedPreferences.intolerancias || [];

    // Navega al componente de recetas con las preferencias seleccionadas
    this.router.navigate(['/recetasDe'], { queryParams: { categoria, dietas: JSON.stringify(dietas), intolerancias: JSON.stringify(intolerancias) } });
  }
}

// FUNCIONA (PRE PRUEBAS INTOLERANCIAS Y DIETAS):
// export class CategoriaComponent {

//   constructor(private router: Router) {}

//   buscarCategoria(categoria: string): void {
//     // Redirige al componente de buscador con la categoría seleccionada
//     this.router.navigate(['/recetasDe'], { queryParams: { categoria } });
//   }
// }