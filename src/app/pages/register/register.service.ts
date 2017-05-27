import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// set global url 
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
export class RegisterService {

    // Resolve HTTP using the constructor
    constructor (private http: Http, public global: GlobalState) {
    }
    // private instance variable to hold base url
    private url = this.global.GlobalUrl+'/users/';

    signUp (body: Object): Promise<User> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //console.log(bodyString);

        return this.http.post(this.url+'signup', body, options) // ...using post request
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        // save to local storage
        try {
            localStorage.setItem('auth_token', body['token']);
            localStorage.setItem('profile', body['email']);
        } catch (error) {
            console.log(error)
        }

        return body;
    }

    private handleError (error: Response | any) {
        return Promise.reject(error);
    } 
   
}

export class User {
    constructor(
        public name: string, 
        public email: string,
        public password:string
        ){}
}