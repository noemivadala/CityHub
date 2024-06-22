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
    <div class="post-details">
      <h2>{{ post?.title }}</h2>
      <p>{{ post?.body }}</p>
    </div>

    <div class="comments">
      <h3>Comments</h3>
      <div *ngFor="let comment of comments" class="comment">
        <h4>{{ comment.name }}</h4>
        <p>{{ comment.body }}</p>
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
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));
    console.log(this.postId);
    if (this.postId) {
      this.fetchPostDetails(this.postId);
      this.fetchPostComments(this.postId);
    }
  }

  fetchPostDetails(postId: number) {
    this.goRest.getPostDetail(postId).subscribe(response => {
      this.post = response;
    });
  }

  fetchPostComments(postId: number) {
    this.goRest.getPostComment(postId).subscribe(response => {
      this.comments = response;
    });
  }

}
