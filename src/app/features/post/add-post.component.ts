import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/post';
import { GorestService } from '../../service/gorest.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [],
  template: `
    <h4 class="text-xl font-semibold mb-2">📑 New post</h4>
    <form>
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <div class="my-2">
                <input type="text" id="title" name="title" placeholder="Title" class="input w-full max-w-xs" />
              </div>
              <div class="my-2">
                <textarea id="message" name="message" placeholder="Message" class="input w-full h-20 max-w-xs pt-2"></textarea>
              </div>
              <input type="submit" value="Send" class="btn btn-neutral btn-sm mt-3" />
            </div>
          </div>
        </div>
    </form>
  `,
  styles: ``
})
export class AddPostComponent {
  @Output() postAdded = new EventEmitter<Post>();

  newPost: Post = {
    user_id: 1, title: '', body: '',
    id: 0
  };

  constructor(private goRest: GorestService) {}

}
