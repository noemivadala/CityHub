import { Component } from '@angular/core';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [],
  template: `
    <h4 class="text-xl font-semibold mb-2">📑 New user</h4>
    <form>
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <div class="my-2">
                <input type="text" id="title" name="name" placeholder="Title" class="input w-full max-w-xs" />
              </div>
              <div class="my-2">
                <input id="message" name="email" placeholder="Message" class="input w-full h-20 max-w-xs pt-2">
              </div>
              <div class="my-2">
                <label for="gender" class="block text-sm font-medium">Gender</label>
                <div class="mt-2">
                  <select id="gender" name="gender" class="input w-full h-20 max-w-xs pt-2">
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>
              </div>
              <input type="submit" value="Send" class="btn btn-neutral btn-sm mt-3" />
            </div>
          </div>
        </div>
    </form>
  `,
  styles: ``
})
export class AddUsersComponent {

}
