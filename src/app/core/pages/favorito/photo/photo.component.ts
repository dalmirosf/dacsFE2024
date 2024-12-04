import { Component, Input } from '@angular/core';
import { Photo } from '../../../models/photo';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
@Input()
photo!:Photo

}
