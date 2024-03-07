import { Component } from '@angular/core';
import { NavbarComponent } from "../../core/components/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent],
    template: `
    <app-navbar></app-navbar>
  `,
    styles: ``,
})
export default class HomeComponent {

}
