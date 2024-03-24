import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 class="text-3xl font-semibold mb-2">Post 👋🏻</h3>
    <div class="flex flex-wrap gap-3">
      <div class="shadow-md rounded-md p-5 my-6 max-w-xl" *ngFor="let post of posts">
        <div class="flex items-center gap-5 mb-4 ">
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div class="block">
            <p class="font-bold mb-1">Chelsea Hagon</p>
            <p class="font-light text-slate-500 text-xs">December 9 at 11:43 AM</p>
          </div>
        </div>
        <div class="block">
          <h4 class="text-lg font-semibold">
            {{ post.title }}
          </h4> 
          <p class="text-base leading-6">
            {{ post.body }}
          </p>
        </div>
        <button class="btn btn-sm mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
          Comment
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export default class PostComponent {

  posts: Post [] = [];

  constructor( private goRest: GorestService){}

  ngOnInit() {
    this.goRest.getPost().subscribe(posts => {
      this.posts = posts.map(post => {
        return {
          id: post.id,
          user_id: post.user_id,
          title: post.title,
          body: post.body,
        };
      });
    });
  }

}
