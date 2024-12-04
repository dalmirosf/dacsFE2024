import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.interface';


@Injectable({
    providedIn: 'root',
  })
  export class BusquedaService {
    constructor(private http: HttpClient) {}
  
    // Método para obtener una receta por su ID
    getReceta(id: number): Observable<Receta> {
      return this.http.get<Receta>(`https://api.spoonacular.com/recipes/${id}/tasteWidget?apiKey=4a582b4b06604470a63695248ca419ee`);
    }
  
}

/*  Busca teniendo en cuenta lo que seleccionó en la pantalla principal Categoría  */







/*  Busca teniendo en cuenta el id de la receta */