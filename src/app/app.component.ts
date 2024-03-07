import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [],

})
export class AppComponent {
  title = 'CityHub';
}
