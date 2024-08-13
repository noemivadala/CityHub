import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-navbar *ngIf="isLoggedIn()"></app-navbar>
    <div class="flex justify-center items-center background">
      <div class="container max-w-screen-xl mt-8 justify-center">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    styles: [],
    imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule]
})
export class AppComponent {

  title = 'CityHub';

  constructor(private authService: AuthService){}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
