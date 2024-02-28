import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MachineParkComponent } from './components/machine-park/machine-park.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    DashboardComponent,
    MachineParkComponent,
    EmployeesComponent,
    ProjectsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    



  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
