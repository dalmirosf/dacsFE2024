import { Component, Input } from '@angular/core';
import { Receta } from '../../models/receta.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'] 
})
export class RecetaComponent {
  @Input() recetaInfo!: Receta;
}
