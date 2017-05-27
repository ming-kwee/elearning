import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Injectable()
export class LoginService {
  public auth: any;
  constructor(private af: AngularFire) {
    this.auth = firebase.auth();
  }
  
  login(userEmail: string, userPassword: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then(
          userData => resolve(userData),
          err => reject(err));
    });
  }
  
  signUp(email: string, password: string) {
        var creds: any = { email: email, password: password };
        this.af.auth.createUser(creds);
  }

}


