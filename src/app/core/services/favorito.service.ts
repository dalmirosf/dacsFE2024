import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Receta, RecetaResultados } from '../models/receta.interface';


@Injectable({
  providedIn: 'root',
})
export class FavoritoService {

  constructor(private http: HttpClient) {}

  getRecetasList(): Observable<RecetaResultados> {
    return this.http.get<RecetaResultados>('https://api.spoonacular.com/recipes/complexSearch?apiKey=4a582b4b06604470a63695248ca419ee&query=pasta&number=20');
  }

  getRecetaById(id: number): Observable<Receta> {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=4a582b4b06604470a63695248ca419ee`;
    return this.http.get<Receta>(url);
  }
  
}


/*  Busca teniendo en cuenta la entrada 'pasta'  */
