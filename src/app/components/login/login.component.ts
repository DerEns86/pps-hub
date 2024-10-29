import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatCard, MatCardHeader, MatCardContent, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, NgIf, MatError, MatButton, MatProgressBar]
})
export class LoginComponent implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);
  private formbuilder = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);

  loginForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        await this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
        this.router.navigateByUrl('/dashboard');
      } catch (error: any) {
        if (error && error.message)
          console.error('Something went wrong', error.message);
        this.snackbarService.openSnackBar(error.message, 'error-snackbar')
      } finally {
        this.isLoading = false;
      }
    }
  }

  onNavigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
