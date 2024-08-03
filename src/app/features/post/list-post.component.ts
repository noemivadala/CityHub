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
        <h3 class="text-3xl font-semibold mb-2">Post 👋🏻</h3>
      </div>
      <div>
        <app-search class="inline-block search-input" (searchChanged)="onSearchChanged($event)"></app-search>
      </div>
    </div>

    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <div class="flex flex-wrap gap-3">
        <div class="shadow-md rounded-md p-5 my-6 max-w-md" *ngFor="let post of filteredPosts">
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
          <button class="btn btn-sm mt-4" (click)="post.id !== undefined && viewComment(post.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
            Comment
          </button>
        </div>
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
                  New Post
                </div>
                <div class="collapse-content"> 
                  <app-add-post (postAdded)="onPostAdded($event)"></app-add-post>
                </div>
              </div>
          </div>
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

  onPostAdded(newPost: Post) {
    this.posts.unshift(newPost);
    this.filterPosts();
  }

}
