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
export class ConfirmService {
  constructor(public http: Http, public global: GlobalState) { 
    console.log('Confirm service');
  }

  getCustomerById (ID: any): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.global.GlobalUrl+`/customerlist/`+ID, options) // ...using  request
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError (error: Response | any) {
        return Promise.reject(error);
    } 

}