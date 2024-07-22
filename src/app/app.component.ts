import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pps-hub';

  authService = inject(AuthService);
  router = inject(Router);


  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
