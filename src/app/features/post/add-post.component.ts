import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/post';
import { GorestService } from '../../service/gorest.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-2">
      <input type="text" placeholder="Title" class="input input-bordered input-xs w-full max-w-xs mb-2" [(ngModel)]="newPost.title"/>
      <textarea
        placeholder="Text"
        class="textarea textarea-bordered textarea-xs w-full max-w-xs"
        [(ngModel)]="newPost.body">
      </textarea>
      <button (click)="addPost()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
        Add
      </button>
    </div>
  `,
  styles: ``
})
export class AddPostComponent {

  newPost: Post = { id: 0, user_id: 1, title: '', body: '' };

  @Output() postAdded = new EventEmitter<Post>();

  constructor(private goRest: GorestService) {}

  addPost(): void {
    this.goRest.addPost(this.newPost).subscribe({
      next: post => {
        this.postAdded.emit(post);
        this.newPost = { id: 0, user_id: 1, title: '', body: '' };
      },
      error: error => {
        console.error('Error adding post:', error);
      }
    });
  }

}
