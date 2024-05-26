import { Component } from '@angular/core';

@Component({
  selector: 'app-post-summary',
  standalone: true,
  imports: [],
  template: `
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
      <div class="flex gap-1 mt-2">
      <a href="users" class="text-xs ml-2">All post</a>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
      </svg>
    </div>
      
  `,
  styles: ``
})
export class PostSummaryComponent {

}
