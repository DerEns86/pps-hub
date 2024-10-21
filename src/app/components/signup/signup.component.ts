import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatCard, MatCardHeader, MatCardContent, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, NgIf, MatError, MatButton]
})
export class SignupComponent {
  loginForm: FormGroup = new FormGroup({});

  private auth = inject(AuthService);
  private formbuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.register(this.loginForm.value.username, this.loginForm.value.email, this.loginForm.value.password)
      this.router.navigateByUrl('/login');
    }
  }
}


