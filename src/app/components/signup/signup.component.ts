import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
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


