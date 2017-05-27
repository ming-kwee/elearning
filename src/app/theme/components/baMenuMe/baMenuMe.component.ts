import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router, Routes, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {MENU} from '../../../../app/app.menu';
import * as _ from 'lodash';
import {BaMenuMeService} from './baMenuMe.service';
import {GlobalState} from '../../../global.state';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'ba-menu-me',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baMenuMe.scss')],
  template: require('./baMenuMe.html'),
  providers: [BaMenuMeService]
})
export class BaMenuMe {

  @Input() menuRoutes:Routes = [];
  @Input() sidebarCollapsed:boolean = false;
  @Output() expandMenu = new EventEmitter<any>();


  // here we declare which routes we want to use as a menu in our sidebar

  public menuItems:any[];
  public showHoverElem:boolean;
  public hoverElemHeight:number;
  public hoverElemTop:number;
  protected _onRouteChange:Subscription;
  public outOfArea:number = -200;

  constructor(private _router:Router, private _service:BaMenuMeService, private _state:GlobalState,
    private localStorageService: LocalStorageService) {


    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });
  }

  public selectMenuAndNotify():void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
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

  public hoverItem($event):void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event):boolean {
    var submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
