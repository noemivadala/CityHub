import { Component, OnInit } from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment';
import { AddCommentComponent } from "./add-comment.component";

@Component({
    selector: 'app-comment',
    standalone: true,
    template: `
    <div class="grid gap-4 grid-cols-2 grid-rows-2 container-home mt-6">
      <div>
        <h3>Post</h3>
        <div class="shadow-md rounded-md p-5 my-6 max-w-xl">
            <div class="flex items-center gap-5 mb-4 ">
              <div class="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold">
                {{ post?.title }}
              </h4>
            </div>
            <div class="block">
              <p class="text-base leading-6">
                {{ post?.body }}
              </p>
            </div>
        </div>
        <div class="comments">
        <div *ngIf="comments.length <= 0">
          No comment
        </div>
        <div *ngFor="let comment of comments" class="shadow-md rounded-md p-5 my-6 max-w-xl">
          <div class="flex gap-2">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full" style="width: 1.5rem;">
                <span class="text-xs">{{ getNameLetter(comment.name) }}</span>
              </div>
            </div>
            <h4>{{ comment.name }}</h4>
          </div>
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </div>

      <div class="add-component">
        <h3 class="mb-3">Add comment</h3>
        <app-add-comment [postId]="postId!" (commentAdded)="CommentAdd($event)"></app-add-comment>
      </div>
    </div>
  `,
    styles: ``,
    imports: [CommonModule, AddCommentComponent]
})
export default class CommentComponent implements OnInit{

  postId: number | null = null;
  post: Post | null = null;
  comments: Comment[] = [];

  constructor( private goRest: GorestService, private route: ActivatedRoute,){}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));
    console.log(this.postId);
    if (this.postId) {
      this.PostDetails(this.postId);
      this.PostComments(this.postId);
    }
  }

  PostDetails(postId: number) {
    this.goRest.getPostDetail(postId).subscribe(response => {
      this.post = response;
    });
  }

  PostComments(postId: number) {
    this.goRest.getPostComment(postId).subscribe(response => {
      this.comments = response;
    });
  }

  CommentAdd(comment: Comment) {
    this.comments.push(comment);
  }

  getNameLetter(name: string): string {
    return name.charAt(0).toUpperCase();
  }

}
