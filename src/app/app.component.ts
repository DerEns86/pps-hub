import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pps-hub';

  drawerMode: MatDrawerMode = 'side';

  @ViewChild('drawer') drawer!: MatDrawer;

  authService = inject(AuthService);
  router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);


  ngOnInit(): void {
      this.breakpointObserver.observe([ Breakpoints.Small]).subscribe(result => {
        if (result.matches){
          this.drawerMode = 'over';
        } else {
          this.drawerMode = 'side';
        }
      })
  }

  closeDrawer(): void {
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
