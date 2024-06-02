import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container-user">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div>
          <div class="collapse bg-base-200">
            <div class="collapse-title bg-primary peer-checked:bg-secondary peer-checked:text-secondary-content">
              <div class="avatar online placeholder ml-2">
                <div class="bg-neutral text-neutral-content rounded-full w-8">
                  <span class="text-xl">+</span>
                </div>
              </div>
              <input type="text" placeholder="Name" [(ngModel)]="newUser.name" class="input input-sm" />
            </div>
            <div class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
              <input type="text" placeholder="Email" [(ngModel)]="newUser.email" class="input input-sm" />
              <input type="text" placeholder="Gender" [(ngModel)]="newUser.gender" class="input input-sm" />
              <button class="btn btn-primary" (click)="addUser()">Add User</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: ``
})
export class AddUsersComponent {

  @Output() addUserEvent = new EventEmitter<User>();

  newUser: User = {
    id: null,
    name: '',
    email: '',
    gender: '',
    status: ''
  };

  addUser() {
    this.addUserEvent.emit(this.newUser);
    this.newUser = {
      id: null,
      name: '',
      email: '',
      gender: '',
      status: ''
    };
  }
}
