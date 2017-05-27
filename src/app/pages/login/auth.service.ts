import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }           from './user';
import {Observable} from 'rxjs/Rx';
import { GlobalState } from '../../global.state';
// Import RxJs required methods
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    // Resolve HTTP using the constructor
    constructor (private http: Http, private global: GlobalState) {
    }
    // private instance variable to hold base url
    private menuFilter: any;

    login (body: Object): Promise<User> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post( this.global.GlobalUrl+'/users/login', body, options) // ...using post request
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }


    getMenu(role: String): Promise<any> {
      // get token in localstorage
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });

      if (role==null) role = 'user'
      return this.http.get(this.global.GlobalUrl+'/users/roles/'+role, options)
               .toPromise()
               .then(response  => this.menuFilter = response.json())
               .catch(this.handleError)
  }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('menu');

    }


    isLoggedIn() {
        if (localStorage.getItem('auth_token')) {
            return true;
        } else {
            return false;
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        // save to local storage
        console.log(body);
        try {
            localStorage.setItem('auth_token', body['token']);
            localStorage.setItem('profile', body['email']);
            localStorage.setItem('menu', body['role']);
        } catch (error) {
            console.log(error)
        }

        return body;
    }

    private handleError (error: Response | any) {
                console.log(error);
        return Promise.reject(error);
    } 
   
}