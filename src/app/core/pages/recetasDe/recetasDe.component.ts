import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { RecetaResultados } from '../../models/receta.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-recetasDe',
  standalone: true,
  imports: [CommonModule],  // Añade CommonModule aquí
  templateUrl: './recetasDe.component.html',
  styleUrls: ['./recetasDe.component.css']
})
export class recetasDeComponent implements OnInit {
  public recetaResultado$!: Observable<RecetaResultados>;
  public categoria!: string;
  public preferencias = { dietas: [], intolerancias: [] }; // Almacena preferencias
  public tieneRecetas: boolean = true; // Variable para controlar si hay recetas
  public cargandoRecetas: boolean = true; // Variable para controlar si las recetas se están cargando

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoria = params['categoria'];

      // Cargar preferencias de los parámetros de consulta
      this.preferencias.dietas = JSON.parse(params['dietas'] || '[]');
      this.preferencias.intolerancias = JSON.parse(params['intolerancias'] || '[]');

      if (this.categoria) {
        // Llama al servicio con las preferencias incluidas
        this.recetaResultado$ = this.service.getRecetasList(this.categoria, this.preferencias);
        
        // Suscribirse al observable para saber cuándo se ha cargado la lista
        this.recetaResultado$.subscribe({
          next: (result) => {
            if (result.results.length === 0) {
              this.tieneRecetas = false; // Si no hay recetas, mostrar mensaje alternativo
            }
            this.cargandoRecetas = false; // Una vez que se cargan las recetas, desactivar el indicador de carga
          },
          error: () => {
            this.cargandoRecetas = false; // Si hay error, desactivar el indicador de carga
            this.tieneRecetas = false;
          }
        });
      }
    });
  }

  buscarReceta(id: number): void {
    // Redirige al componente de búsqueda con el id seleccionado
    this.router.navigate(['/busqueda'], { queryParams: { id } });
  }

  // Función en el componente para manejar el clic en el corazón
  toggleHeart(event: Event, id: number): void {
    const heart = event.target as HTMLElement;
    heart.classList.toggle('liked'); // Cambia el estilo del corazón
    event.stopPropagation(); // Evita que el clic también active la receta
  
    // Gestionar favoritos en localStorage
    let favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
  
    if (heart.classList.contains('liked')) {
      if (!favoritos.includes(id)) {
        favoritos.push(id); // Agrega el ID si no existe
      }
    } else {
      favoritos = favoritos.filter(favId => favId !== id); // Elimina el ID si ya no está seleccionado
    }
  
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Guarda en localStorage
  }
}
