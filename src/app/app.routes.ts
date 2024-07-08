import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'users', canActivate: [AuthGuard],  loadComponent: () => import('./features/users/users.component')},
    { path: 'post', canActivate: [AuthGuard], loadComponent: () => import('./features/post/list-post.component')},
    { path: 'login', loadComponent:() => import('./features/login/login.component')},
    { path: 'profile/:id', loadComponent:() => import('./features/users/profile-user.component') },
    { path: 'post/:postId', loadComponent:() => import('./features/comment/comment.component') },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
