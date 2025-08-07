import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('currentUser');
  return isLoggedIn;
};
