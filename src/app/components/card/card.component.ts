import { Component, Input } from '@angular/core';
import { IMarcas } from '../../models/marcas.model';

@Component({
  selector: 'card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() marcaCarro!: IMarcas
}
