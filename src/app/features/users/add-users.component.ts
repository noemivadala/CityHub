import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { GorestService } from '../../service/gorest.service';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-2">
      <input [(ngModel)]="newUser.name" type="text" placeholder="Name" class="input input-bordered input-xs w-full max-w-xs mb-2" />
      <input [(ngModel)]="newUser.email" type="text" placeholder="Email" class="input input-bordered input-xs w-full max-w-xs mb-2" />
      <select [(ngModel)]="newUser.gender" class="select select-bordered select-xs w-full max-w-xs mb-2">
        <option>Male</option>
        <option>Female</option>
      </select>
      <select [(ngModel)]="newUser.status" class="select select-bordered select-xs w-full max-w-xs mb-2">
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <button (click)="addUser()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
        Add
      </button>
    </div>
  `,
  styles: ``
})
export class AddUsersComponent {

  newUser: User = { id: 0, name: '', email: '', gender: 'Male', status: 'Active' };

  @Output() userAdded = new EventEmitter<User>();

  constructor(private goRest: GorestService) {}

  addUser(): void {
    this.goRest.createUser(this.newUser).subscribe(user => {
      this.userAdded.emit(user);
      this.newUser = { id: 0, name: '', email: '', gender: 'Male', status: 'Active' };
    }, error => {
      console.error('Errore:', error);
    });
  }
}
