
// import { AngularFire, FirebaseListObservable, FirebaseApp, FirebaseObjectObservable } from 'angularfire2';
import { Injectable} from '@angular/core';
import { Router }  from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GlobalState } from '../../../../global.state';

export interface Sponsor {
  sponsor_name;
  sponsor_address;
  city_state;
  category_tag;
  brand_tag;
  join_date;
  contact_person;
  booth_no;  
  email;  
  password;
  user_id
  event_id;
  event_name;
}


@Injectable()
export class SponsorshipService {
  constructor(
    private http: Http,
    private router:Router,
    private global: GlobalState){  
  }

private smartTableData: any;
  getSponsorList(eventID:any)  {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/sponsors/list/' + eventID;
      return this.http.get(Url, options);
  }  

  getSponsor(ID:any) : Observable<Sponsor> {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/sponsors/' + ID;
      return this.http.get(Url, options)
      .map((res:Response) => res.json())      
      .catch((error:any) => Observable.throw(error.json().error || 'Data not found!'));
  }

  createSponsor (body: Object): Observable<Object[]> {
    console.log('insert',body);
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url = this.global.GlobalUrl+'/sponsors/insert'; 
    return this.http.post(Url, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error)); //...errors if any
  }

  updateSponsor(body: Object): Observable<Object[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url = this.global.GlobalUrl+'/sponsors/update';
    return this.http.put(Url, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  deleteSponsor(_Id:any): Observable<Object[]> {
    let token   = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    let Url = this.global.GlobalUrl+'/sponsors/delete/'+ _Id;
    return this.http.delete(Url, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getVisitors(sponsorEmail:any) {
        return this.http.get(this.global.GlobalUrl+`/visitors/get_visitor/${sponsorEmail}`)
                        .toPromise()
                        .then(response => response.json());

  }

}