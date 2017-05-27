
import { Injectable} from '@angular/core';
import { Router }  from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BusinessService {
public productsNode: any; //FirebaseListObservable<any>;;
public product: any;
public UID: any;
  constructor(
    private http: Http,
    private router:Router){  
  }


  viewProductService(prodId:any){
    // return this.af.database.object('/products/' + prodId)
  }

  removeProductService(prodId:any, pictGUID:any){
  }

  listProductService(){
    return this.productsNode;
  }


  updateProductServive(pictureDatas: any, productData: any, prodId:any, lenofdirty:number, uploadedImgURLs: any, i:number=0){    
  }




}