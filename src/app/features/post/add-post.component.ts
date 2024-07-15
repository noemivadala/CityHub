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
      <button (click)="onSubmit()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
        Add
      </button>
    </div>
  `,
  styles: ``
})
export class AddPostComponent {
  @Output() postAdded = new EventEmitter<Post>();

  newPost: Post = {
    user_id: 1, 
    title: '', 
    body: '',
    id: 0
  };

  constructor(private goRest: GorestService) {}

  onSubmit() {
    this.goRest.addPost(this.newPost).subscribe(post => {
      this.postAdded.emit(post);
      this.newPost = { user_id: 1, title: '', body: '', id: 0 };
    });
  }

}
