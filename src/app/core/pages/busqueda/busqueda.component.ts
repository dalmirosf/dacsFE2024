import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Receta, Ingredient } from '../../models/receta.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-busqueda',
  standalone: true,
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  imports: [CommonModule]
})
export class BusquedaComponent implements OnInit {
  public recetaSeleccionada?: Receta;
  public ingredientesLista: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoriaService.getRecetaById(id).subscribe((receta) => {
          // Asegúrate de que la receta se asigna correctamente
          this.recetaSeleccionada = receta;
          this.ingredientesLista = receta.extendedIngredients || []; // Asegura que no sea undefined
        });
      }
    });
  }
}
