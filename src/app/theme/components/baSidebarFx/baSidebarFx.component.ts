import {Component, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import {GlobalState} from '../../../global.state';
import {layoutSizes, BaMenuFxService} from '../../../theme';
import {MENU} from '../../../../app/app.menu';
import {MENU2} from '../../../../app/app.menu';
import * as _ from 'lodash';


@Component({
  selector: 'ba-sidebarfx',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baSidebarFx.scss')],
  template: require('./baSidebarFx.html')
})
export class BaSidebarFx {

  // here we declare which routes we want to use as a menu in our sidebar
  public routes = _.cloneDeep(MENU2); // we're creating a deep copy since we are going to change that object

  constructor(private _elementRef:ElementRef, private _state:GlobalState,
    private _service:BaMenuFxService) {
    this._service.updateMenuByRoutes(this.routes);
  }

  public ngOnInit():void {
  }

  public ngAfterViewInit():void {
  }


}
