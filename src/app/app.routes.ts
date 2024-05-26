import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { 
        path: 'home',
/*         canActivate: [authGuard],  */
        loadComponent:() => import('./features/home/home.component'),
    },
    { path: 'post', loadComponent: () => import('./features/post/post.component')},
    { path: 'users', loadComponent: () => import('./features/users/users.component')},
    { path: 'login', loadComponent:() => import('./features/login/login.component')},
    { path: 'profile', loadComponent:() => import('./features/profile/profile.component') },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
