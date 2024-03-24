import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  getToken(){
    const token = localStorage.getItem('token');
    console.log(token);
  }

  deleteToken(): void {
    localStorage.clear();
  }

}
