import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

loginForm: FormGroup = new FormGroup({});
auth= inject(AuthService)

  constructor(private formbuilder: FormBuilder) {
    
   }

ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted');
      console.log(this.loginForm.value.email);
      
      // this.router.navigate(['/main']);
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
    }
    
  }
}
