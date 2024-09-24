import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(Auth);
  isLoggedIn: boolean = false;
  constructor() { }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        console.log(user.user.uid);
        sessionStorage.setItem('userId', user.user.uid);
        this.isLoggedIn = true;
        console.log('loggedIn',this.isLoggedIn);
        
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

  async logout() {
    await signOut(this.auth)
      .then(() => {
        console.log('Your looged out');
        sessionStorage.removeItem('userId');
        this.isLoggedIn = false;
        console.log('loggedIn',this.isLoggedIn);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
