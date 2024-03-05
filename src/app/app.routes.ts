import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent:() => import('./features/home/home.component') },
    { path: 'users', loadComponent:() => import('./features/users/users.component') },
    { path: 'post', loadComponent:() => import('./features/post/post.component') },
    { path: 'login', loadComponent:() => import('./features/login/login.component') },
    { path: '', redirectTo: 'demo1', pathMatch: 'full'}
];
