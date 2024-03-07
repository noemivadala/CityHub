import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
    styles: [],
    imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export default class AppComponent {
  title = 'CityHub';
}
