import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Comment } from '../../models/comment';
import { GorestService } from '../../service/gorest.service';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #commentForm="ngForm" (ngSubmit)="onSubmit(commentForm)" class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <input name="name" [(ngModel)]="comment.name" required class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name">
        </div>
        <div class="w-full md:w-1/2 px-3">
          <input name="email" [(ngModel)]="comment.email" required email class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="info@gmail.com">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <textarea name="body" [(ngModel)]="comment.body" required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="textarea" placeholder="Text comment"></textarea>
        </div>
      </div>
      <input class="btn btn-sm" type="submit" value="Submit" />
    </form>

  `,
  styles: ``
})
export class AddCommentComponent {

  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<Comment>();

  comment: Partial<Comment> = {
    post_id: this.postId,
    name: '',
    email: '',
    body: '',
  };

  constructor(private goRest: GorestService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newComment: Comment = {
        ...this.comment as Comment,
        post_id: this.postId
      };
      this.goRest.addComment(this.postId, newComment).subscribe(response => {
        this.commentAdded.emit(response);
        form.resetForm();
      });
    }
  }

}
