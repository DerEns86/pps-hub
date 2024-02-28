import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { MachineParkComponent } from './components/machine-park/machine-park.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, children: [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'machine-park', component: MachineParkComponent },
    { path: 'projects', component: ProjectsComponent }
  ]},


  // otherwise redirect to login
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
