import { Component, OnInit } from '@angular/core';
import { GorestService } from '../../service/gorest.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <div *ngIf="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>

      <div *ngIf="comments.length > 0">
        <h2>Comments</h2>
        <div *ngFor="let comment of comments">
          <h3>{{ comment.name }}</h3>
          <p>{{ comment.body }}</p>
          <p><strong>Email:</strong> {{ comment.email }}</p>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export default class CommentComponent implements OnInit{

  postId: number | null = null;
  post: Post | null = null;
  comments: Comment[] = [];

  constructor( private goRest: GorestService, private route: ActivatedRoute,){}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.fetchPostDetails(this.postId);
      this.fetchPostComments(this.postId);
    }
  }

  fetchPostDetails(postId: number) {
    this.goRest.getPostsByUser(postId).subscribe(response => {
      this.post = response.find(post => post.id === postId) || null;
    });
  }

  fetchPostComments(postId: number) {
    this.goRest.getPostComment(postId).subscribe(response => {
      this.comments = response;
    });
  }

}
