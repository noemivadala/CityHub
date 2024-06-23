import { Component, OnInit } from '@angular/core';
import { ActiveUsersComponent } from "../users/active-users.component";
import { GorestService } from '../../service/gorest.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
    selector: 'app-profile-users',
    standalone: true,
    template: `
    <div *ngIf="user">
      <div class="grid gap-4 grid-cols-2 grid-rows-2 container-home mt-6">
        <div class="gap-5 mb-4 ">
          <div class="avatar placeholder mb-4">
            <div class="bg-neutral text-neutral-content rounded-full w-12">
              <span class="text-xl">{{ getNameLetter(user.name) }}</span>
            </div>
          </div> 
          <div>
            <p class="text-xl font-bold mb-1">{{ user.name }}</p>
            <p class="font-light text-slate-500 text-sm">{{ user.gender }}</p>
          </div>
          <p class="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            {{ user.email }}
          </p>
          <p class="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            {{ user.status }}
          </p>
        </div>
      <div *ngIf="posts.length <= 0">
        No posts
      </div>
      <div *ngIf="posts.length > 0">
        <h3>Post</h3>
          <div *ngFor="let post of posts" class="shadow-md rounded-md p-5 my-6 max-w-xl">
            <div class="flex items-center gap-5 mb-4 ">
              <div class="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold">
                {{ post.title }}
              </h4>
            </div>
            <div class="block">
              <p class="text-base leading-6">
                {{ post.body }}
              </p>
            </div>
            <button class="btn btn-sm mt-4" (click)="viewComment(post.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              Comment
            </button>
        </div>
      </div>
    </div>
  </div>
  `,
    styles: ``,
    imports: [ActiveUsersComponent, CommonModule]
})

export default class ProfileUserComponent implements OnInit {

  userId: string | null = null; //
  user: User | null = null;
  posts: Post[] = [];

  constructor(private route: ActivatedRoute, private goRest: GorestService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.fetchUserDetails(Number(this.userId));
      this.fetchUserPosts(Number(this.userId));
    }
  }

  fetchUserDetails(id: number) {
    this.goRest.getDetailUser(id).subscribe(response => {
      this.user = response;
    });
  }

  fetchUserPosts(userId: number) {
    this.goRest.getPostsByUser(userId).subscribe(response => {
      this.posts = response;
      console.log(this.posts);
      console.log(userId);
    });
  }

  viewComment(postId: number) {
    this.router.navigate(['/post', postId]);
  }

  getNameLetter(name: string): string {
    return name.slice(0, 2).toUpperCase();
  }
}