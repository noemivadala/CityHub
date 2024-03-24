import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../core/components/navbar.component";
import { ActiveUsersComponent } from "../users/active-users.component";
import { WelcomeComponent } from "../../shared/welcome/welcome.component";
import { UserSummaryComponent } from "../../shared/user-summary/user-summary.component";
import { PostSummaryComponent } from "../../shared/post-summary/post-summary.component";

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
      <app-welcome></app-welcome>
      <div class="grid gap-4 grid-cols-2 grid-rows-2 container-home mt-6">
        <app-active-users></app-active-users>
        <app-post-summary></app-post-summary>
        <app-user-summary></app-user-summary>
      </div>
  `,
    styles: ``,
    imports: [RouterOutlet, NavbarComponent, ActiveUsersComponent, WelcomeComponent, UserSummaryComponent, PostSummaryComponent]
})
export default class HomeComponent {

  constructor(){}

}
