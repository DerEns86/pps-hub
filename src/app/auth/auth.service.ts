import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

auth = inject(Auth);

  constructor() { }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
    .then((user) =>{
      // const token = user.user.idToken;
      console.log(user.user.uid);
      sessionStorage.setItem('userId', user.user.uid);

    })
    .catch((error) => {
      console.log(error);
    })
  }

  async register(username: string, email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
    .then((user) => {
      console.log(user)
      console.log(username)

    })
    .catch((error) => {
      console.error(error);
    })
  }
}
