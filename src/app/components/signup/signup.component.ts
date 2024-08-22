import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  loginForm: FormGroup = new FormGroup({});
  auth= inject(AuthService)
  
    constructor(private formbuilder: FormBuilder) {
      
     }
  
  ngOnInit(): void {
      this.loginForm = this.formbuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }
  
    onSubmit() {
      if (this.loginForm.valid) {
        console.log('Form submitted');
        console.log(this.loginForm.value.email);
        
        // this.router.navigate(['/main']);
        this.auth.register(this.loginForm.value.username, this.loginForm.value.email, this.loginForm.value.password)
      }
      
    }
  }
  

