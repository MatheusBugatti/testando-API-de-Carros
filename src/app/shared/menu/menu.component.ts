import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    PoMenuModule,
    PoToolbarModule, 
    PoPageModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems : Array<PoMenuItem> = [
    {label: 'Home', icon: 'po-icon-star', shortLabel: 'Welcome', action: () => this.navigateTo('welcome')},
    {label: 'Tipo veiculo', icon: 'po-icon po-icon-home', shortLabel: 'Tipo veiculo', action: () => this.navigateTo('')}
  ]

  constructor(private _router: Router){}

  navigateTo(route: string): void {
    this._router.navigate([route]);
  }
}
