import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'home', canActivate: [authGuard], loadComponent:() => import('./features/home/home.component') },
    { path: 'users', loadComponent:() => import('./features/users/users.component') },
    { path: 'post', loadComponent:() => import('./features/post/post.component') },
    { path: 'login', loadComponent:() => import('./features/login/login.component') },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
