import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Injectable()
export class LogoutService {
  public auth: any;
  constructor(private af: AngularFire) {
    this.auth = firebase.auth();
  }
  
  logout() {
    return this.auth.signOut();
  }

}


