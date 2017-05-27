import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router }  from '@angular/router';
import { Sponsor, SponsorshipService } from './sponsorship.service';
import { Eventt, EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'sponsorship-list',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./sponsorshipList.scss')],
  template: require('./sponsorshipList.html'),
  providers:[SponsorshipService]
})

export class SponsorshipList implements OnInit {
  private sponsor: Sponsor[];
  private selectedSponsor: Sponsor;
  private events: SelectItem[] = []
  private data: Array<any> = []
  private eventidname: String = null;
  private selectedEvent: any;
  private showfilter:boolean=false;
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  private msgs: Message[] = [];
  
  constructor(protected service: SponsorshipService,  public router:Router, public eventService: EventSeminarService) {

    this.busyloadevent.template = `<div style="margin-top: 10px; text-align: center; font-size: 15px; ">
                <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>  
                {{message}}
            </div>`
    this.busyloadevent.busy= this.eventService.getActiveEventSeminar(localStorage.getItem('profile')).subscribe(
      data => {
        this.data = data.json();

        if (this.data.length==1){
          this.onChangeCombo({ id:this.data[0]._id, name:this.data[0].event_name});
        } else {
          this.events.push({label:"<Choose Event Name>", value:null}); 
          if (this.data.length>10){
            this.showfilter=true;
          }
        }

        for (var i = 0; i <  this.data.length; i++) {
          this.events.push({label:this.data[i].event_name, value:{ id:this.data[i]._id, name:this.data[i].event_name}});
        }

        if(sessionStorage.getItem('selectedEvent')!= undefined){
          try {
            this.selectedEvent = JSON.parse(sessionStorage.getItem('selectedEvent'));
            this.onChangeCombo(this.selectedEvent);            
          } catch (error) {            
          }
        }
        
      }, 
      err => {
        console.log(err);
      }
    );


  };


onChangeCombo(eventidname){
  if (eventidname) {
    sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
    this.eventidname = eventidname;

    this.busyloadevent.busy=this.service.getSponsorList(this.eventidname['id']).subscribe(
      data => {
        if(data.json().length){
          this.sponsor = data.json();
        } else {
          this.sponsor = [];
        }      
      }, 
      err => {
        console.log(err);
      }
    );
  } else {
    sessionStorage.removeItem('selectedEvent');
    this.sponsor=[];
  }
}



  ngOnInit() {
  }



  onRowUnselect(event) {
  }

  addNewProduct(){
    if (this.eventidname){
      this.router.navigate(['pages/company/sponsorship', '', this.eventidname['id'], this.eventidname['name']]);
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'please choose event name'});
    }
  }
  onRowSelect(event) {
    this.router.navigate(['pages/company/sponsorship', event.data._id, this.eventidname['id'], this.eventidname['name']]);
  }


}
