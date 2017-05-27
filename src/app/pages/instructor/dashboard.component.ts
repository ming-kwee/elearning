import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DashboardService }       from './dashboard.service';


@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  private courses: any;
  constructor(private actroute: ActivatedRoute, private service: DashboardService){
    }

  ngOnInit(){            
       this.service.getCourses().then(
        data => {
          if(data.length){
            this.courses = data;
          } else {
            this.courses = []
          }
          console.log(data);
        }, 
        err => {
          console.log(err);
          if (err._body == 'You are not authorized' && err.status == 500 ) {
          }
        }
      );
  }


}
