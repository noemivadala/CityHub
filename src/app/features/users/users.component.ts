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

          <div class="menu p-4 w-60 min-h-full text-base-content">
              <div class="collapse bg-base-200">
                <input type="checkbox" /> 
                <div class="collapse-title flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Add user
                </div>
                <div class="collapse-content"> 
                  <app-add-users></app-add-users>
                </div>
              </div>

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
              <a (click)="openAllCollaps()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p>Edit user</p>
              </a>
            </li>
          </div>
        
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
    const checkboxes = document.querySelectorAll('.collapse-user input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => {
      checkbox.checked = !allChecked;
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
