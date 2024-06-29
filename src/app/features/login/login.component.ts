import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>Login</h2>
      <input [(ngModel)]="token" placeholder="Enter GoRest Token" />
      <button (click)="saveToken()">Save Token</button>
    </div>
  `,
  styles: ``
})
export default class LoginComponent {

  token: string = '';

  saveToken() {
    localStorage.setItem('gorest-token', this.token);
  }

}
