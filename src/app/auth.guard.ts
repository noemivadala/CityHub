import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router)
  const isLogged = true;
  if (!isLogged) {
    router.navigateByUrl('login')
  }
  return isLogged
}
