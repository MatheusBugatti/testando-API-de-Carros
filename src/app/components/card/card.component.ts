import { Component, Input } from '@angular/core';
import { IResponse } from '../../models/response.model';
import { PoDynamicModule } from '@po-ui/ng-components';

@Component({
  selector: 'card',
  standalone: true,
  imports: [
    PoDynamicModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() marcaCarro!: IResponse
}
