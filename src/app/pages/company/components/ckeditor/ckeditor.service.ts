
import { Injectable} from '@angular/core';
import { Router }  from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GlobalState } from '../../../../global.state';
export interface Template {
  template_name: String,
  template_body: String
}

@Injectable()
export class TemplateService {
  constructor(
    private http: Http,
    private router:Router,
    private global: GlobalState){    
  }


  updateinsertTemplate(body: Object): Observable<Object[]> {
    // let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url =  this.global.GlobalUrl+'/company/updatetemplate';
    return this.http.put(Url, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTemplate(eventid:any) : Observable<any> {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url =  this.global.GlobalUrl+'/company/gettemplate/' + eventid;
      return this.http.get(Url, options)
      .map((res:Response) => res.json())      
      .catch((error:any) => Observable.throw(error.json().error || 'Data not found!'));
  }

}