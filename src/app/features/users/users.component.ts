import { Component, ElementRef, Renderer2} from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from "./delete-user.component";
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "../../core/components/search.component";
import { AddUsersComponent } from "./add-users.component";
import { Router } from '@angular/router';
import { CardUserComponent } from "./card-user.component";

@Component({
    selector: 'app-users',
    standalone: true,
    template: `
      <div class="flex justify-between mb-3">
        <div>
          <h3 class="text-3xl font-semibold mb-2">Users</h3>
        </div>
        <div>
          <app-search class="inline-block search-input"(searchChanged)="onSearchChanged($event)"></app-search>
        </div>
      </div>
      <app-add-users *ngIf="showAddUser"></app-add-users>

      <div class="drawer lg:drawer-open gap-8">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">

          <div class="container-list-users">
            <app-card-user
              *ngFor="let user of filteredUsers"
              [user]="user"
              [editFields]="editFields"
              [selectedUserId]="selectedUserId"
            ></app-card-user>
          </div>
        </div> 

        <div class="drawer-side">
          <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 

          <ul class="menu p-4 w-60 min-h-full text-base-content">
            <li>
              <div class="collapse collapse-menu bg-base-200">
                <input type="checkbox" class="peer" /> 
                <div class="collapse-title collapse-title-menu flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p>Add user</p>
                </div>
                <div class="collapse-content"> 
                  <app-add-users></app-add-users>
                </div>
              </div>
            </li>
            <li>
              <a (click)="openAllCollaps()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p>View details</p>
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <p>Delete user</p>
              </a>
            </li>
          </ul>
        
        </div>
      </div>
  `,
    styles: ``,
    imports: [CommonModule, DeleteUserComponent, FormsModule, SearchComponent, AddUsersComponent, CardUserComponent]
})
export default class UsersComponent {

  users: User [] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  editFields: boolean = true;
  selectedUserId: any;

  constructor( private goRest: GorestService, private router: Router, private renderer: Renderer2, private el: ElementRef ){}

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


  openAllCollaps() {
    const collapsItems = document.querySelectorAll('.collapse');
    collapsItems.forEach(item => {
      item.classList.toggle('collapse-open');
    });
  }

  showAddUser = false;

  addUser(newUser: User) {
    this.goRest.createUser(newUser).subscribe((createdUser: User) => {
      this.users.push(createdUser);
      this.filteredUsers = [...this.users];
      this.showAddUser = false;
    });
  }

  addUserEvent(){
    this.showAddUser = true;
  }


}
