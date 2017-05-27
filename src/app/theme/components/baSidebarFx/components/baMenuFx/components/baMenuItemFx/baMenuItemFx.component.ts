import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ba-menu-item-fx',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baMenuItemFx.scss')],
  template: require('./baMenuItemFx.html')
})
export class BaMenuItemFx {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

 constructor() {
  }


  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
