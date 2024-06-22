import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { 
        path: 'home',
/*         canActivate: [authGuard],  */
        loadComponent:() => import('./features/home/home.component'),
    },
    { path: 'post', loadComponent: () => import('./features/post/list-post.component')},
    { path: 'users', loadComponent: () => import('./features/users/users.component')},
    { path: 'login', loadComponent:() => import('./features/login/login.component')},
    { path: 'profile', loadComponent:() => import('./features/profile/my-profile.component') },
    { path: 'profile/:id', loadComponent:() => import('./features/profile/profile-users.component') },
    { path: 'post/:postId', loadComponent:() => import('./features/comment/comment.component') },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
