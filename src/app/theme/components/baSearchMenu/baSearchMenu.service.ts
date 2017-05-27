import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp, FirebaseObjectObservable } from 'angularfire2';
import {Subscription, BehaviorSubject, Observable} from 'rxjs/Rx';

@Injectable()
export class BaSearchMenuService {
  public searchesNode: any;
  // public menusData : any;
  
  constructor(
    private af: AngularFire) {
 }
 
}
