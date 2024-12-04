import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FavoritoService } from '../../services/favorito.service';  
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorito',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css']
})
export class FavoritoComponent implements OnInit {
  public recetaResultado$!: Observable<any[]>;
  public tieneFavoritos: boolean = true; // Variable para controlar si hay favoritos

  constructor(
    private service: FavoritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  // Carga las recetas favoritas
  cargarFavoritos(): void {
    const favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (favoritos.length > 0) {
      // Si hay favoritos, cargamos las recetas
      const requests = favoritos.map(id => this.service.getRecetaById(id));
      this.recetaResultado$ = forkJoin(requests).pipe(
        map(results => results)
      );
      this.tieneFavoritos = true; // Establecer que sí hay favoritos
    } else {
      // Si no hay favoritos, emitimos un array vacío
      this.recetaResultado$ = of([]);
      this.tieneFavoritos = false; // No hay favoritos
    }
  }

  // Redirige a la receta detallada
  buscarReceta(id: number): void {
    this.router.navigate(['/busqueda'], { queryParams: { id } });
  }

  // Elimina la receta de favoritos
  toggleHeart(event: Event, id: number): void {
    event.stopPropagation(); // Evita activar la redirección al hacer clic en el corazón

    let favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    favoritos = favoritos.filter(favId => favId !== id); // Elimina el ID de la lista
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Actualiza el localStorage

    this.cargarFavoritos(); // Recarga la lista de favoritos
  }
}
