import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  if(authService.isLoggedIn) {
    console.log('User is logged in');
    
  return true;
  }else {
    router.navigateByUrl('/login')
    return false;
  }
  
};


