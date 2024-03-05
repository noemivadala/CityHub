import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <button class="btn" routerLink="home" routerLinkActive="text-sky-400">Home</button>
    <button class="btn" routerLink="users" routerLinkActive="text-sky-400">Users</button>
    <button class="btn" routerLink="post" routerLinkActive="text-sky-400">Post</button>
    <button class="btn" routerLink="login" routerLinkActive="text-sky-400">Login</button>
  `,
  styles: ``
})
export class NavbarComponent {

}
