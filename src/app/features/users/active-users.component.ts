import { Component } from '@angular/core';
import { User } from '../../models/user';
import { GorestService } from '../../service/gorest.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex" *ngFor="let user of activeUsers">
    <div class="avatar online placeholder">
      <div class="bg-neutral text-neutral-content rounded-md w-16">
        <span class="name-user-active"> {{user.name}} </span>
      </div>
    </div> 
    </div>
  `,
  styles: ``
})
export class ActiveUsersComponent {

  activeUsers: User[] = [];

  constructor( private goRest: GorestService ){}

  ngOnInit(): void {
    this.goRest.getUsers().subscribe(users => {
      this.activeUsers = users.filter(user => user.status === 'active');
      console.log(this.activeUsers);
    });
  }

}
