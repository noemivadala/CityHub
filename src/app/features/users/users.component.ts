import { Component, ElementRef, Renderer2} from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "../../core/components/search.component";
import { AddUsersComponent } from "./add-users.component";
import { Router } from '@angular/router';
import { CardUserComponent } from "./card-user.component";

@Component({
    selector: 'app-users',
    standalone: true,
    template: `
      <div class="flex mb-3 gap-2 items-center">
        <h3 class="text-3xl font-semibold mb-2">Users</h3>
        <app-search class="inline-block" (searchChanged)="onSearchChanged($event)"></app-search>
      </div>

      <div>
        <app-add-users *ngIf="showAddUser"></app-add-users>
        <div class="drawer lg:drawer-open gap-8">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex flex-col items-center">

            <div class="container-list-users">
              <app-card-user
                *ngFor="let user of filteredUsers"
                [user]="user"
                [selectedUserId]="selectedUserId"
                (userDeleted)="handleUserDeleted($event)"
              ></app-card-user>
            </div>
            <div class="join">
            <button 
              *ngFor="let page of [].constructor(totalPages); let i = index" 
              class="join-item btn btn-xs" 
              [ngClass]="{'btn-active': currentPage === i + 1}"
              (click)="onPageChange(i + 1)">
              {{ i + 1 }}
            </button>
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
                    <app-add-users (userAdded)="handleUserAdded($event)"></app-add-users>
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
            </div>
          </div>
        </div>
      </div>
  `,
    styles: ``,
    imports: [CommonModule, FormsModule, SearchComponent, AddUsersComponent, CardUserComponent]
})
export default class UsersComponent {

  users: User [] = [];
  // utenti filtrati da visualizzare
  filteredUsers: User[] = [];
  currentPage: number = 1;
  //numero utenti visibili
  pageSize: number = 6;
  totalPages: number = 0;
  searchTerm: string = '';
  //id utente selezionato
  selectedUserId: any;
  newUser: User = { id: 0, name: '', email: '', gender: 'Male', status: 'active' };


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
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      //chiama funzione primi risultati
      this.updateFilteredUsers();
    });
  }

  //aggiorna utenti pagina corrente
  updateFilteredUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredUsers = this.users.slice(startIndex, endIndex);
  }

  //cambiamento pagina
  onPageChange(page: number) {
    this.currentPage = page;
    this.updateFilteredUsers();
  }

  //eliminazione utente e aggiornamento pagina
  handleUserDeleted(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updateFilteredUsers();
  }

  //cerca
  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterUsers();
  }

  //filtra user per nome ed email
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

  //visualizza dettagli checkbox apri/chiudi
  openAllCollaps() {
    const checkboxes = document.querySelectorAll('.collapse-user input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => {
      checkbox.checked = !allChecked;
    });
  }
  
  showAddUser = false;

  //modulo create user
  addUserEvent(){
    this.showAddUser = true;
  }

  //aggiunto utente
  handleUserAdded(user: User): void {
    this.users.unshift(user);
    this.filteredUsers = [...this.users];
  }


}
