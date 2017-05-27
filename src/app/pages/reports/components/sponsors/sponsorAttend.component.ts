import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

import { SponsorAttendService } from './sponsorAttend.service';
import { EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
@Component({
  selector: 'sponsorAttend',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./sponsorAttend.component.scss')],
  template: require('./sponsorAttend.component.html'),
})
export class SponsorAttend {

  private sponAttendHeader:any;
  private sponAttendContent:any;
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  private data: Array<any> = [];
  private events: SelectItem[] = [];
  private showfilter:boolean=false;  
  private selectedEvent: any;
  private eventidname: String = null;


  constructor(private sponsorAttendService: SponsorAttendService,
  public eventService: EventSeminarService) {
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
            

  }


  
  onChangeCombo(eventidname){
    if(eventidname){
      sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
      this.eventidname = eventidname;
    this.sponAttendHeader=[]
    this.busyloadevent.busy= 
          this.sponsorAttendService.getSponAttend(this.eventidname['id']).subscribe(
        data => {
          this.sponAttendHeader.push(data[0]);
          this.sponAttendContent = data;
        }
      )
    } else {
      sessionStorage.removeItem('selectedEvent');
      this.sponAttendContent=[];
    }     
  }


  print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Sponsor Attend List</title>
            <style>

              .mytable { 
                  border-collapse: collapse; 
                  margin-top:10px;
                  margin-bottom:40px;
                  table-layout: fixed;
                  width: 100%;
              }
              /* Zebra striping */
              .mytable tr:nth-of-type(odd) { 
                  background: #eee; 
                  }
              .mytable th { 
                  background: #3498db; 
                  color: white; 
                  }
              .mytable td, th { 
                  padding: 7px; 
                  border: 1px solid #ccc; 
                  text-align: center;
                  font-size: 10px;
                      word-wrap: break-word;

                  }
              .mytable .nourut {
                  width:30px;
              }

              .kodeclaim {
                  font-weight: bold;
                  font-size: 14px;
              }

              .div-jarak {
                  margin:10px 0px 10px 0px;
              }
            </style>
          </head>
      <body onload="window.print();window.close()">
        ${printContents}
      </body>
        </html>`
      );
      popupWin.document.close();
  }

}
