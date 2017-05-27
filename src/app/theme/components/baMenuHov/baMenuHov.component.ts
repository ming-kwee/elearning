import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router, Routes, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {MENU} from '../../../../app/app.menu';
import * as _ from 'lodash';
import {BaMenuHovService} from './baMenuHov.service';
import {GlobalState} from '../../../global.state';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'ba-menu-hov',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baMenuHov.scss')],
  template: require('./baMenuHov.html'),
  providers: [BaMenuHovService]
})
export class BaMenuHov {
  @Input() title: string;
  @Input() menuRoutes:Routes = [];


  // here we declare which routes we want to use as a menu in our sidebar
  public menuItems:any[];
  protected _onRouteChange:Subscription;

  constructor(private _router:Router, private _service:BaMenuHovService, private _state:GlobalState,
    private localStorageService: LocalStorageService) {

    this._onRouteChange = this._router.events.subscribe((event) => {
      // if (event instanceof NavigationEnd) {
      //   if (this.menuItems) {
      //     this.selectMenuAndNotify();
      //   } else {
      //     // on page load we have to wait as event is fired before menu elements are prepared
      //     setTimeout(() => this.selectMenuAndNotify());
      //   }
      // }
    });
  }


  public ngOnInit():void {
    let routes:any;
    var interval = setInterval(() => { //wajib setTimeout disini untuk menunggu data sdh async baru diassing ke menuItems

      routes = this.localStorageService.get('SearchMenu');
      if (routes != null) {
          this.menuItems = this._service.convertRoutesToMenus(routes);
          clearInterval(interval);
      }
    }, 1000);

    
  }

  public ngOnDestroy():void {
    this._onRouteChange.unsubscribe();
  }
}
