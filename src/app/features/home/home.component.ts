import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../core/components/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
    styles: ``,
})
export default class HomeComponent {

}
