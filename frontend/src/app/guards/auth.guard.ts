import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('user');
  return isLoggedIn;
};
