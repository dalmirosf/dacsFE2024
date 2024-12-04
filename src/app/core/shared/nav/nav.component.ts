import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  searchQuery: string = '';  // Propiedad para almacenar el valor del input
  menuVisible: boolean = false;  // Controla la visibilidad del menú desplegable

  constructor(private router: Router) {}  // Usa Router para la navegación

  
  // Captura el valor del input de búsqueda y lo guarda en searchQuery
  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  buscar(): void {
    if (this.searchQuery.trim()) {
      const savedPreferences = JSON.parse(localStorage.getItem('preferencias') || '{}');
      const dietas = savedPreferences.dietas || [];
      const intolerancias = savedPreferences.intolerancias || [];

      this.router.navigate(['/recetasDe'], { queryParams: { categoria: this.searchQuery, dietas: JSON.stringify(dietas), intolerancias: JSON.stringify(intolerancias) } });
      this.searchQuery = '';
    } else {
      console.log('Por favor ingresa un término de búsqueda');
    }
  }


  // Alterna la visibilidad del menú desplegable
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  // Función para manejar la acción de "Cerrar sesión"
  cerrarSesion(): void {
    console.log('Cerrando sesión...');
    //  lógica  para cerrar la sesión, por ejemplo:
    // this.authService.logout();  // sirve para servicios de autenticación

    // Después de cerrar sesión, redirigir a la página principal 
    this.router.navigate(['/login']);  // Redirige a la página de login 

    // Cierra el menú
    this.menuVisible = false;
  }
}


// BUSCAR FUNCIONA -- PRE PRUEBAS DE INTOLERANCIAS Y DIETAS
  // Redirige a la ruta de búsqueda con el valor de searchQuery como parámetro
  // buscar(): void {
  //   if (this.searchQuery.trim()) {  // Verifica si el término de búsqueda no está vacío
  //     // Usa router.navigate() para redirigir a la ruta de búsqueda con el parámetro
  //     this.router.navigate(['/recetasDe'], { queryParams: { categoria: this.searchQuery } });
  //     // Limpia el campo de búsqueda después de redirigir
  //     this.searchQuery = '';  // Borra el valor de searchQuery
  //   } else {
  //     console.log('Por favor ingresa un término de búsqueda');
  //   }
  // }