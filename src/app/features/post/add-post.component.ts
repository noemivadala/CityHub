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
      <input type="text" placeholder="Title" class="input input-bordered input-xs w-full max-w-xs mb-2" />
      <textarea
        placeholder="Text"
        class="textarea textarea-bordered textarea-xs w-full max-w-xs">
      </textarea>
      <button (click)="addPost()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
        Add
      </button>
    </div>
  `,
  styles: ``
})
export class AddPostComponent {

  newPost: Post = { id: 0, user_id: 0, title: '', body: '' };

  @Output() postAdded = new EventEmitter<Post>();

  constructor(private goRest: GorestService) {}

  addPost(): void {
    this.goRest.addPost(this.newPost).subscribe(user => {
      this.postAdded.emit(user);
      this.newPost = { id: 0, user_id: 0, title: '', body: '' };
    }, error => {
      console.error('Error adding user:', error);
    });
  }

}
