import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preferencia.component.html',
  styleUrls: ['./preferencia.component.css']
})
export class PreferenciaComponent implements OnInit {
  dietas = [
    { name: 'Ovolacteovegetariano', apiName: 'ovo-vegetarian', selected: false },
    { name: 'Vegano', apiName: 'vegan', selected: false },
    { name: 'Vegetariano', apiName: 'vegetarian', selected: false },
    { name: 'Keto', apiName: 'ketogenic', selected: false },
    { name: 'Paleo', apiName: 'paleo', selected: false }
  ];

  intolerancias = [
    { name: 'Gluten', apiName: 'gluten', selected: false },
    { name: 'Lactosa', apiName: 'dairy', selected: false },
    { name: 'Soja', apiName: 'soy', selected: false },
    { name: 'Mariscos', apiName: 'shellfish', selected: false },
    { name: 'Frutos secos', apiName: 'tree nut', selected: false }
  ];

  ngOnInit() {
    // Cargar preferencias del localStorage al iniciar el componente
    const savedPreferences = JSON.parse(localStorage.getItem('preferencias') || '{}');
    if (savedPreferences.dietas) {
      this.dietas.forEach(dieta => {
        dieta.selected = savedPreferences.dietas.includes(dieta.apiName);
      });
    }
    if (savedPreferences.intolerancias) {
      this.intolerancias.forEach(intolerancia => {
        intolerancia.selected = savedPreferences.intolerancias.includes(intolerancia.apiName);
      });
    }
  }

  // Método para manejar el cambio de estado de los checkboxes
  onCheckboxChange(event: Event, item: { selected: boolean }): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      item.selected = input.checked;  // Asignar el valor de 'checked' al objeto 'item'
      this.actualizarPreferencias();
    }
  }

  actualizarPreferencias(): void {
    const selectedDietas = this.dietas.filter(dieta => dieta.selected).map(dieta => dieta.apiName);
    const selectedIntolerancias = this.intolerancias.filter(intolerancia => intolerancia.selected).map(intolerancia => intolerancia.apiName);

    const preferencias = { dietas: selectedDietas, intolerancias: selectedIntolerancias };
    localStorage.setItem('preferencias', JSON.stringify(preferencias));
  }
}
