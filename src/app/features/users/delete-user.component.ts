import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Are you sure?</h3>
        <p class="py-4">Do you want to delete the user?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn mr-2">Close</button>
          </form>
          <button class="btn btn-error">Delete</button>
        </div>
      </div>
    </dialog>
  `,
  styles: ``
})
export class DeleteUserComponent {

}
