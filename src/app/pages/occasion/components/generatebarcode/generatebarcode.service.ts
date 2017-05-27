import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
// set global url 
import { GlobalState } from '../../../../global.state';

@Injectable()
export class GenerateBarcodeService {
sharingdata:any=[];
private token   = localStorage.getItem('auth_token');
private headers = new Headers({'Content-Type': 'application/json', 'x-access-token': this.token });

  constructor(public http: Http, public global: GlobalState) {
  }

  smartTableData


  getCustomerConfirmed(eventid): Promise<any> {
    return this.http.get(this.global.GlobalUrl+`/customerlist/confirmed/${eventid}`, {headers: this.headers})
               .toPromise()
               .then(response  => this.smartTableData = response.json())
  }

  SaveChosenTemplate(json){
    // this.sharingdata=[];
    return this.http.post(this.global.GlobalUrl+'/templatesetting/savechosentemplate', json, {headers: this.headers})
                        .toPromise()
                        .then(response => response.json());
  }

  GettingChosenTemplate(eventid){
    return this.http.get(this.global.GlobalUrl+`/templatesetting/loadchosentemplate/${eventid}`)
                        .toPromise()
                        .then(response => response.json());
  }

  SaveTemplateSetting(data){
    return this.http.post(this.global.GlobalUrl+'/templatesetting/savetemplate', data, {headers: this.headers})
                        .toPromise()
                        .then(response => response.json());
  }

  LoadTemplateSetting(eventid){
     return this.http.get(this.global.GlobalUrl+`/templatesetting/${eventid}`)
                        .toPromise()
                        .then(response => response.json());
  }

  update(idrow,_id): Promise<any>{
    if(this.smartTableData[idrow].Print === undefined){
      this.smartTableData[idrow]['Print']=  1;
    }else{
      this.smartTableData[idrow].Print= this.smartTableData[idrow].Print + 1;
    }
    var data = JSON.stringify({ id: _id, Print: this.smartTableData[idrow].Print });
    return this.http.post(this.global.GlobalUrl+'/customerlist/update_print', data, {headers: this.headers})
                      .toPromise()
                      .then(response => response.json());
  }
}
