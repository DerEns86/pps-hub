import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  isLoggedIn: boolean = false;
  constructor() { }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        sessionStorage.setItem('userId', user.user.uid);
        this.isLoggedIn = true;
      })
      .catch((error) => {
        throw error;
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
        throw error;
      })
  }

  async logout() {
    await signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem('userId');
        this.isLoggedIn = false;
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
