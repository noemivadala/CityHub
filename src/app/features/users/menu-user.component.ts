import { Component, EventEmitter, Output } from '@angular/core';
import UsersComponent from './users.component';
import { AddUsersComponent } from './add-users.component';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-user',
  standalone: true,
  imports: [AddUsersComponent, CommonModule],
  template: `
    <ul class="menu bg-base-200 rounded-box fixed top-1/2 transform -translate-y-1/2">
      <li>
        <a class="tooltip tooltip-right" data-tip="Add user" (click)="openAddUser()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </a>
      </li>
      <li>
        <a class="tooltip tooltip-right" data-tip="Details" (click)="onDetailClicked()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </a>
      </li>
      <li>
        <a class="tooltip tooltip-right" data-tip="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </a>
      </li>
    </ul>
    <app-add-users *ngIf="showAddUser" (addUserEvent)="addUser($event)"></app-add-users>
  `,
  styles: ``
})
export class MenuUserComponent {

  constructor(private usersComponent: UsersComponent) {}


  onDetailClicked() {
    this.usersComponent.openAllCollaps();
    console.log('ho cliccato')
  }

  showAddUser: boolean = false;

  openAddUser() {
    this.showAddUser = true;
  }

  addUser(newUser: User) {
    // Aggiungi il nuovo utente alla tua lista di utenti o invia ad un servizio per l'aggiunta effettiva
    console.log('Nuovo utente:', newUser);
    // Chiudi il modulo di aggiunta dell'utente
    this.showAddUser = false;
  }

}
