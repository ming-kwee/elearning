import {Component, AfterViewInit, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalState} from '../../global.state';
import { HomeService }       from './home.service';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home  implements AfterViewInit, OnInit  {
  private courses: any;

public SwipeOptions: any;

  constructor(private _router:Router, private activatedRoute: ActivatedRoute, 
  private _state:GlobalState, private service: HomeService){
    this._state.notifyDataChanged('menu.isHideShow', true);
  }

  ngAfterViewInit () {
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
