import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

loginForm: FormGroup = new FormGroup({});

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
      // this.router.navigate(['/main']);
    }
    
  }
}
