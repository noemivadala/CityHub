import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "../../core/components/search.component";
import { AddPostComponent } from "./add-post.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-post',
    standalone: true,
    template: `
    <div class="flex justify-between mb-3">
      <div>
        <h3 class="text-3xl font-semibold mb-2">Posts 👋🏻</h3>
      </div>
      <div>
        <app-search class="inline-block search-input" (searchChanged)="onSearchChanged($event)"></app-search>
      </div>
      <div>
        <div class="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer-4" class="drawer-button btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              New post
            </label>
          </div> 
          <div class="drawer-side">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <!-- Sidebar content here -->
              <app-add-post></app-add-post>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-3">
      <div class="shadow-md rounded-md p-5 my-6 max-w-xl" *ngFor="let post of filteredPosts">
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
  `,
    styles: ``,
    imports: [CommonModule, FormsModule, SearchComponent, AddPostComponent]
})
export default class PostComponent {

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm: string = '';

  constructor(private goRest: GorestService, private router: Router) {}

  ngOnInit() {
    this.goRest.getPost().subscribe(posts => {
      this.posts = posts.map(post => ({
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        body: post.body,
      }));
      
      this.filteredPosts = [...this.posts];
    });
  }

  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterPosts();
  }

  filterPosts() {
    if (this.searchTerm.trim() !== '') {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPosts = [...this.posts];
    }
  }

  viewComment(postId: number) {
    this.router.navigate(['/post', postId]);
  }

}
