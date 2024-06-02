import { Component} from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from "./delete-user.component";
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "../../core/components/search.component";
import { AddUsersComponent } from "./add-users.component";
import { Router } from '@angular/router';
import { MenuUserComponent } from './menu-user.component';

@Component({
    selector: 'app-users',
    standalone: true,
    template: `
      <app-menu-user></app-menu-user>
      <div class="flex justify-between mb-3">
        <div>
          <h3 class="text-3xl font-semibold mb-2">Users</h3>
        </div>
        <div>
          <app-search class="inline-block search-input"(searchChanged)="onSearchChanged($event)"></app-search>
        </div>
      </div>

      <div class="container-list-users">
        <div class="container-user" *ngFor="let user of filteredUsers">
          <div class="lg:flex lg:items-center lg:justify-between">
            <div>
              <div class="collapse bg-base-200">
                <input type="checkbox" class="peer" /> 
                <div class="collapse-title bg-primary peer-checked:bg-secondary peer-checked:text-secondary-content">
                  <div [ngClass]="{'online': user.status === 'active', 'offline': user.status === 'inactive'}" class="avatar online placeholder ml-2">
                    <div class="bg-neutral text-neutral-content rounded-full w-8">
                      <span class="text-xl">AI</span>
                    </div>
                  </div>
                  {{user.name}}
                </div>
                <div class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                  <div class="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    {{user.gender}}
                  </div>
                  <div class="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <div *ngIf="editFields && user.id === selectedUserId">
                      <input [(ngModel)]="user.email" style="color:#212121;" class="input input-sm" />
                    </div>
                    <div *ngIf="!editFields || user.id !== selectedUserId">
                      <span>{{ user.email }}</span>
                    </div>
                  </div>
                  <div class="flex">
                    <button class="btn btn-sm mt-3 ml-1" (click)="editFieldsButton(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      EDIT
                    </button>
                    <button *ngIf="editFields && user.id === selectedUserId" class="btn btn-sm mt-3 ml-1" (click)="editFieldsButton(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      SAVE
                    </button>
                    <button class="btn btn-sm mt-3 ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `,
    styles: ``,
    imports: [CommonModule, DeleteUserComponent, FormsModule, SearchComponent, AddUsersComponent, MenuUserComponent]
})
export default class UsersComponent {

  users: User [] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  selectedUserId: any;

  constructor( private goRest: GorestService, private router: Router ){}

  ngOnInit() {
    this.goRest.getUsers().subscribe(users => {
      this.users = users.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          status: user.status,
        };
      });
      this.filteredUsers = [...this.users];
    });
  }

  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterUsers();
  }

  filterUsers() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  editFields = false;

  editFieldsButton(userId: any) {
    if (this.selectedUserId === userId) {
      this.editFields = !this.editFields;
    } else {
      this.selectedUserId = userId;
      this.editFields = true;
    }
  }


}
