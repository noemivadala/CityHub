import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="mb-2">
    <input type="text" placeholder="Name" class="input input-bordered input-xs w-full max-w-xs mb-2" />
    <select class="select select-bordered select-xs w-full max-w-xs mb-2">
      <option>Male</option>
      <option>Female</option>
    </select>
    <input type="text" placeholder="Email" class="input input-bordered input-xs w-full max-w-xs mb-2" />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
      Add
    </button>
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
