import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey = '';
  authDomain = '';
  firebaseApp: firebase.app.App = undefined;
  token = '';

  signup(email: string, password: string, apiKey: string, authDomain: string) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    if (this.firebaseApp === undefined) {
      this.firebaseInit();
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        alert('error on signup');
      });
  }

  signin(email: string, password: string, apiKey: string, authDomain: string) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    if (this.firebaseApp === undefined) {
      this.firebaseInit();
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => this.token = token
        );
      })
      .catch(error => {
          console.log(error);
          alert('error on signin');
        }
      );
  }

  constructor(private router: Router) {
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token !== '';
  }

  logOut() {
    firebase.auth().signOut();
    this.token = '';
  }

  private initializeApp() {
    return this.firebaseApp = firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain
    });
  }

  private firebaseInit() {
    if (this.firebaseApp !== undefined) {
      this.firebaseApp.delete().then(_ => {
          this.initializeApp();
        }
      );
    } else {
      this.firebaseApp = this.initializeApp();
    }
  }
}
