import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class="container container-login">
    <div class="w-full max-w-96 block">
      <h2 class="text-xs">SIGN IN</h2>
      <h1 class="mb-2">Access Your Account.</h1>
      <h4 class="mb-6 text-base">Don't have the token? <a class="font-semibold" href="#">Link</a></h4>
      <label class="input input-bordered flex items-center gap-2 mb-6">
        <input [(ngModel)]="token" type="password" class="grow" placeholder="GoRest Token" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg>
      </label>
      <div *ngIf="token?.length !== 64 && token" class="input-error">
        Token must be exactly 64 characters long.
      </div>
      <button class="btn btn-sm" (click)="login()">Enter</button>
    </div>
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
