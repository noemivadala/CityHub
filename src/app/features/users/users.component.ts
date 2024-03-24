import { Component} from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from "./delete-user.component";


@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, DeleteUserComponent],
    template: `
    <div *ngIf="componenteAttivo">
      <app-delete-user></app-delete-user>
    </div>
    <div class="flex my-8 justify-around" *ngFor="let user of users">
        <div id="user" class="flex justify-between items-center">
          <div class="avatar" [ngClass]="{'online': user.status === 'active', 'offline': user.status === 'inactive'}">
            <div class="w-16 mask mask-squircle">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div class="inline w-28">
            <p>{{ user.name }}</p>
            <p>{{ user.gender }}</p>
          </div>
          <div class="flex justify-end">
            <button class="btn btn-outline btn-sm mx-2" onclick="my_modal_5.showModal()">
              Open
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </button>
            <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                <div class="flex justify-between">
                  <h3 class="font-bold text-lg">{{ user.name }}</h3>
                  <button class="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                </div>
                <p class="py-4">{{ user.email }}</p>
                <p class="py-4">{{ user.gender }}</p>
                <p class="py-4">{{ user.status }}</p>
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <button class="btn btn-error btn-sm mx-2" (click)="attivaComponente()">
              Delete user
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
    </div>
  `,
    styles: ``,
})
export default class UsersComponent {

  users: User [] = [];

  componenteAttivo: boolean = false;

  attivaComponente(): void {
    this.componenteAttivo = true;
  }

  constructor( private goRest: GorestService){}

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
    });
  }


}
