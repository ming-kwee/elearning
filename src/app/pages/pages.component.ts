import {Component, ViewEncapsulation} from '@angular/core';
import {GlobalState} from '../global.state';
/* ming 15/11/16 */
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <div class="al-main">
      <div class="al-content">
          <ba-sidebar> </ba-sidebar>
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    `
})
export class Pages {
private hideElement: boolean = true;
  constructor(private af: AngularFire,
              private router: Router, private _state:GlobalState) {
    this._state.notifyDataChanged('menu.isHideShow', false);
    
    // this.af.auth.subscribe(auth => {
		//   if(auth){
		//   }else {
    //     auth.uid
    //     this.router.navigate(['/login']);
		//   }
    // });
  }

  ngOnInit() {

  }
}
