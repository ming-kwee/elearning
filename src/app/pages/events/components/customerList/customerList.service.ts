import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }           from './user';
import {Observable} from 'rxjs/Rx';

// set global url 
import { GlobalState } from '../../../../global.state';


// Import RxJs required methods
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerListService {

  constructor(public http: Http, public global: GlobalState) {
    
    console.log('Hello');
  }

private smartTableData: any;

  getRepos(eventId: any): Promise<any> {
      // get token in localstorage
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(this.global.GlobalUrl+`/customerlist/`+ eventId, options)
               .toPromise()
               .then(response  => this.smartTableData = response.json())
  }

  deleteData(_Id: any) {
      // get token in localstorage
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let repos = this.http.delete(this.global.GlobalUrl+`/customerlist/delete/`+ _Id, options);
      return repos;
  }

  sendInvitation(email: Array<String>, eventid: String) {
    let token = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    console.log()
    return this.http.post(this.global.GlobalUrl+`/customerlist/sendinvitation/`+ eventid, email,options)
               .toPromise()
               .then(response  => this.smartTableData = response.json())
  }

  Confirm(id: String) {
    let token = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.global.GlobalUrl+`/customerlist/confirm/`+id,options)
               .toPromise()
               .then(response  => this.smartTableData = response.json())
  }

  Reject(id: String) {
    let token = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.global.GlobalUrl+`/customerlist/reject/`+id,options)
               .toPromise()
               .then(response  => this.smartTableData = response.json())
  }

  Simpan (body: Object): Promise<any> {
    let token   = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.global.GlobalUrl+`/customerlist/insert`, body, options) // ...using post request
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }


  Update (body: Object): Promise<any> {
    let token   = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.global.GlobalUrl+`/customerlist/update`, body, options) // ...using post request
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }


  getCustomerById (ID: any): Promise<any> {
    let token   = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
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