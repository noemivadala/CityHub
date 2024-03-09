import { Component } from '@angular/core';
import { User } from '../../models/user';
import { GorestService } from '../../service/gorest.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h4 class="mb-3 mr-3">Active users</h4>
    <div class="flex">
      <div class="mr-3" *ngFor="let user of activeUsers">
        <div class="avatar online placeholder">
          <div class="bg-neutral text-neutral-content rounded-md h-14 w-28">
            <span class="name-user-active"> {{user.name}} </span>
          </div>
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
export class ActiveUsersComponent {

  activeUsers: User[] = [];

  constructor( private goRest: GorestService ){}

  ngOnInit(): void {
    this.goRest.getUsers().subscribe(users => {
      this.activeUsers = users.filter(user => user.status === 'active').slice(0, 4);;
    });
  }

}
