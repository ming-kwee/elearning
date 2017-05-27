import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { GlobalState } from '../../../../global.state';

@Injectable()
export class SponsorAttendService {
    constructor(private http: Http, private global: GlobalState) {

    }

  getSponAttend(eventid:any) : Observable<any> {
      let token   = localStorage.getItem('auth_token');
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
      let options = new RequestOptions({ headers: headers });
      let Url =  this.global.GlobalUrl+'/sponsorreport/getsponattend/' + eventid;

      return this.http.get(Url, options)
      .map((res:Response) => res.json())      
      .catch((error:any) => Observable.throw(error.json().error || 'Data not found!'));

  }


}
