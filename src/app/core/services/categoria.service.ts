import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta, RecetaResultados } from '../models/receta.interface';


@Injectable({
  providedIn: 'root',
})
export class CategoriaService{
    
  constructor(private http: HttpClient) {}
  
  getRecetasList(categoria: string, preferencias: { dietas: string[]; intolerancias: string[] }): Observable<RecetaResultados> {
    const dietaParams = preferencias.dietas.join(',');
    const intoleranciaParams = preferencias.intolerancias.join(',');

    const url = `/api/conector/search/by-query?query=${categoria}&diets=${dietaParams}&intolerances=${intoleranciaParams}`;
    return this.http.get<RecetaResultados>(url);
  }
  
  getRecetaById(id: number): Observable<Receta> {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=4a582b4b06604470a63695248ca419ee`;
    return this.http.get<Receta>(url);
  }
  
  
}

/*  Busca teniendo en cuenta lo que seleccionó en la pantalla principal Categoría  

#### GETRECTASLIST ANTERIOR QUE FUNCIONA:
getRecetasList(categoria: string): Observable<RecetaResultados> {
    return this.http.get<RecetaResultados>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4a582b4b06604470a63695248ca419ee&query=${categoria}&number=20`);
  }

    getRecetasList(categoria: string, preferencias: { dietas: string[]; intolerancias: string[] }): Observable<RecetaResultados> {
    const dietaParams = preferencias.dietas.join(',');
    const intoleranciaParams = preferencias.intolerancias.join(',');

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=4a582b4b06604470a63695248ca419ee&query=${categoria}&number=20&diet=${dietaParams}&intolerances=${intoleranciaParams}`;
    return this.http.get<RecetaResultados>(url);
  }
*/