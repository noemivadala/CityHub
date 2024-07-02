import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>Login</h2>
      <input [(ngModel)]="token" placeholder="Enter GoRest Token" />
      <button (click)="login()">Save Token</button>
    </div>
  `,
  styles: ``
})
export default class LoginComponent {

  token: string = '';
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.validateToken(this.token).subscribe(isValid => {
      if (isValid) {
        this.authService.saveToken(this.token);
        this.router.navigate(['/users']);
      } else {
        this.error = true;
      }
    });
  }



}
