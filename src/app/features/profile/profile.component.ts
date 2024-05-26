import { Component } from '@angular/core';
import { ActiveUsersComponent } from "../users/active-users.component";
import { PostSummaryComponent } from "../../shared/post-summary/post-summary.component";
import { UserSummaryComponent } from "../../shared/user-summary/user-summary.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
    <div class="grid gap-4 grid-cols-2 grid-rows-2 container-home mt-6">
        <div class="gap-5 mb-4 ">
          <div class="avatar">
            <div class="w-20 rounded-full">
              <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" />
            </div>
          </div>
          <div>
            <p class="text-xl font-bold mb-1">Chelsea Hagon</p>
            <p class="font-light text-slate-500 text-sm">Gender</p>
          </div>
        </div>
        <app-active-users></app-active-users>
        <div>
          <p class="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            devdan_chaturvedi&#64;stehr-gerlach.example
          </p>
        </div>
      <div>
        <h3>Latest post</h3>
        <div class="shadow-md rounded-md p-5 my-6 max-w-xl">
          <div class="flex items-center gap-5 mb-4 ">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" />
              </div>
            </div>
            <div class="block">
              <p class="font-bold mb-1">Chelsea Hagon</p>
              <p class="font-light text-slate-500 text-xs">December 9 at 11:43 AM</p>
            </div>
          </div>
          <div class="block">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Illo impedit sapiente recusandae iusto officiis dolor?
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: ``,
    imports: [ActiveUsersComponent, PostSummaryComponent, UserSummaryComponent]
})
export default class ProfileComponent {

}
