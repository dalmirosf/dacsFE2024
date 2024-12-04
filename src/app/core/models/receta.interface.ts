export interface Receta {
    id: number;
    title: string;
    image: string;
    sweetness?: number;
    saltiness?: number;
    servings: number;
    readyInMinutes: number;
    extendedIngredients: Ingredient[];
    sourceName: string;
    sourceUrl: string;
    /*diet: diet[];
    intolerances: intolerances[];*/
  }
  
  export interface RecetaResultados {
    count: number;
    next: string;
    previous?: string;
    results: Receta[]
  }
  
  export interface Ingredient {
    measures: {
      metric: {
          amount: number;
          unitShort: string;
      };
      us: {
          unit: string;
          value: number;
      };
    };
    
    image: string;
    name: string;
    aisle: string;
    original: string;
}



/*amount: {
        metric: {
            unit: string;
            value: number;
            unitShort: string;
        };
        us: {
            unit: string;
            value: number;
        };
    }; */