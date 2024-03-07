import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../core/components/navbar.component";
import { ActiveUsersComponent } from "../users/active-users.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, ActiveUsersComponent],
    template: `
    <app-navbar></app-navbar>
    <div class="flex justify-center items-center ">
      <div class="container max-w-screen-xl mt-5 justify-center">
        <app-active-users></app-active-users>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    styles: ``,
})
export default class HomeComponent {



}
