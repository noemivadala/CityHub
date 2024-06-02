import { Component, EventEmitter, Output } from '@angular/core';
import UsersComponent from './users.component';

@Component({
  selector: 'app-menu-user',
  standalone: true,
  imports: [],
  template: `
    <ul class="menu bg-base-200 rounded-box fixed top-1/2 transform -translate-y-1/2">
      <li>
        <a class="tooltip tooltip-right" data-tip="Add user">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </a>
      </li>
      <li>
        <a class="tooltip tooltip-right" data-tip="Details" (click)="onDetailClicked()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </a>
      </li>
      <li>
        <a class="tooltip tooltip-right" data-tip="Stats">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </a>
      </li>
    </ul>
  `,
  styles: ``
})
export class MenuUserComponent {

  constructor(private usersComponent: UsersComponent) {}

  onDetailClicked() {
    this.usersComponent.openAllCollaps();
    console.log('ho cliccato')
  }

}
