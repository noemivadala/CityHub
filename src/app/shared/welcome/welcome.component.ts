import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="max-h-48 mb-3">
      <h3 class="text-3xl font-semibold mb-2">Hey Nome 👋🏻</h3>
      <p>Welcome to CityHub, here you can share your ideas!</p>
    </div>
  `,
  styles: ``
})
export class WelcomeComponent {

}
