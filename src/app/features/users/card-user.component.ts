import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GorestService } from '../../service/gorest.service';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
        <div class="container-user">
          <div class="lg:flex lg:items-center lg:justify-between">
            <div>
              <div class="collapse collapse-user bg-base-200">
                <input type="checkbox" class="peer" /> 
                <div class="collapse-title bg-primary peer-checked:bg-secondary peer-checked:text-secondary-content">
                  <div [ngClass]="{'online': user.status === 'active', 'offline': user.status === 'inactive'}" class="avatar online placeholder ml-2">
                    <div class="bg-neutral text-neutral-content rounded-full w-8">
                      <span>{{ getNameLetter(user.name) }}</span>
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
                    <div>
                      <span>{{ user.email }}</span>
                    </div>
                  </div>
                  <div class="flex">
                    <button class="btn btn-sm mt-3 ml-1" (click)="viewProfile(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      PROFILE
                    </button>
                    <button class="btn btn-sm mt-3 ml-1" (click)="deleteClicked(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>                     
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `,
  styles: ``
})
export class CardUserComponent {

  @Input() user!: User;
  @Input() editFields: boolean = false;
  @Input() selectedUserId: any;
  @Output() userDeleted = new EventEmitter<number>();

  constructor(private router: Router, private goRest: GorestService) { }

  viewProfile(userId: any) {
    this.router.navigate(['/profile', userId]);
  }

  deleteClicked(userId: any) {
    this.goRest.deleteUser(userId).subscribe(
      () => {
        console.log(`User with ID ${userId} deleted successfully.`);
        this.userDeleted.emit(userId);
      }
    );
  }

  getNameLetter(name: string): string {
    return name.slice(0, 2).toUpperCase();
  }

}
