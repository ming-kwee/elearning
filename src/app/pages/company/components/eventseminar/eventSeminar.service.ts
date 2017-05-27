
import { Injectable} from '@angular/core';
import { Router }  from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GlobalState } from '../../../../global.state';

export interface Eventt {
  event_name;
  event_location;
  event_address;
  city_state;
  category;
  event_date;
  num_of_participant;
  eo_email;
}


@Injectable()
export class EventSeminarService {
  constructor(
    private http: Http,
    private router:Router,
    private global: GlobalState){  
  }

private smartTableData: any;
  getEventSeminarList(emailID:any)  {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/events/list/' + emailID;
      return this.http.get(Url, options);
  }

  getEventSeminar(ID:any) : Observable<Eventt> {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/events/' + ID;
      return this.http.get(Url, options)
      .map((res:Response) => res.json())      
      .catch((error:any) => Observable.throw(error.json().error || 'Data not found!'));
  }

  createEventSeminar (body: Object): Observable<Object[]> {
    console.log('insert',body);
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url = this.global.GlobalUrl+'/events/insert'; 
    return this.http.post(Url, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error)); //...errors if any
  }

  updateEventSeminar(body: Object): Observable<Object[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url = this.global.GlobalUrl+'/events/update';
    return this.http.put(Url, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  deleteEventSeminar(_Id:any): Observable<Object[]> {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/events/delete/'+ _Id;
    return this.http.delete(Url, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


getActiveEventSeminar(emailID:any)  {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url = this.global.GlobalUrl+'/events/activelist/' + emailID;
      return this.http.get(Url, options);
  }


}