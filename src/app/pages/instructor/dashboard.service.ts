import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
// set global url 
import { GlobalState } from '../../global.state';

@Injectable()
export class DashboardService {
sharingdata:any=[];
private token   = localStorage.getItem('auth_token');
private headers = new Headers({'Content-Type': 'application/json', 'x-access-token': this.token });

  constructor(public http: Http, public global: GlobalState) {
  }

  // private courses: any;


  getCourses(): Promise<any> {
    return this.http.get(this.global.GlobalUrl+`/courses`, {headers: this.headers})
               .toPromise()
               .then(response  => response.json() )
  }




}
