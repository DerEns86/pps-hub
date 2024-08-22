import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { MachineParkComponent } from './components/machine-park/machine-park.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { authGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
    { path: 'machine-park', component: MachineParkComponent, canActivate: [authGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
    



  // otherwise redirect to login
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
