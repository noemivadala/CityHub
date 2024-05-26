import { Component } from '@angular/core';
import { User } from '../../models/user';
import { GorestService } from '../../service/gorest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Latest users</h3>
    <div class="flex" *ngFor="let user of usersSummary">
        <div id="user" class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-12 mask mask-squircle">
              <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" />
            </div>
          </div>
          <div class="inline w-28">
            <p>{{ user.name }}</p>
          </div>
        </div>
    </div>
    <div class="flex gap-1 mt-2">
      <a href="users" class="text-xs ml-2">All users</a>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
      </svg>
    </div>
  `,
  styles: ``
})
export class UserSummaryComponent {

  usersSummary: User[] = [];

  constructor( private goRest: GorestService ){}

  ngOnInit(): void {
    this.goRest.getUsers().subscribe(users => {
      this.usersSummary = users.slice(0, 4);
      console.log(this.usersSummary)
    });
  }

}
