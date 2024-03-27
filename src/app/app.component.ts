import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "./core/components/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-navbar></app-navbar>
    <div class="flex justify-center items-center">
      <div class="container max-w-screen-xl mt-8 justify-center">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
    styles: [],
    imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule, FooterComponent]
})
export class AppComponent {
  title = 'CityHub';
}
