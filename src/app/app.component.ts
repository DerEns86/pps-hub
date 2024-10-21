import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode, MatDrawerContainer } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [MatToolbar, MatIconButton, MatIcon, MatDrawerContainer, MatDrawer, MatDivider, RouterLink, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'pps-hub';

  drawerMode: MatDrawerMode = 'side';

  @ViewChild('drawer') drawer!: MatDrawer;

  authService = inject(AuthService);
  router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);


  ngOnInit(): void {
      this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall]).subscribe(result => {
        if (result.matches){
          this.drawerMode = 'over';
        } else {
          this.drawerMode = 'side';
        }
      })
      // if (sessionStorage.getItem('userId') !== null){
      //   this.authService.isLoggedIn = true;
      // }
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
