import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router }  from '@angular/router';
import { Eventt, EventSeminarService } from './eventSeminar.service';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'eventseminar-list',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./eventSeminarList.scss')],
  template: require('./eventSeminarList.html'),
  providers:[EventSeminarService]
})

export class EventSeminarList implements OnInit {
  eventSs: Eventt[];
  selectedEvent: Eventt;
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(protected service: EventSeminarService,  public router:Router) {

    this.busyloadevent.template =  `
            <div style="margin-top: 10px; text-align: center; font-size: 15px; ">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>  
                {{message}}
            </div>`
    this.busyloadevent.busy=this.service.getEventSeminarList(localStorage.getItem('profile')).subscribe(
      data => {
        this.eventSs = data.json();
      }, 
      err => {
        console.log(err);
      }
    );
  };

  ngOnInit() {
  }


    onRowSelect(event) {
      this.router.navigate(['pages/company/eventseminar', event.data._id]);
      // alert(event.data._id)
        // this.msgs = [];
        // this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand});
    }

    onRowUnselect(event) {
        // this.msgs = [];
        // this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
    }

  addNewProduct(event){
     this.router.navigate(['pages/company/eventseminar', '' ]);
  }
}
