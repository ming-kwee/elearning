import {Component, ViewEncapsulation} from '@angular/core';

/* ming 15/11/16 */
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'pages2',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pages2.scss')],
  template: `
    <div class="me-main">
        <router-outlet></router-outlet>
    </div>
    `
})
export class Pages2 {
private hideElement: boolean = true;
  constructor(private af: AngularFire,
              private router: Router) {

    // this.af.auth.subscribe(auth => {
		//   if(auth){
		//   }else {
    //     this.router.navigate(['/login']);
		//   }
    // });
  }

  ngOnInit() {
  }
}
