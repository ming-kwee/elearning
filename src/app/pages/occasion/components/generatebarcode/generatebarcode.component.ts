import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { QRCodeComponent } from 'angular2-qrcode';

import { GenerateBarcodeService } from './generatebarcode.service';
import { Customer } from './customer';
// get data list event seminar
import { Eventt, EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'generatebarcode',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./generatebarcode.scss')],
  template: require('./generatebarcode.html')
})

export class GenerateBarcode implements OnInit {

  private TemplateName:any;
  private TemplateQR:any;
  private namaQR:any;
  private id:any;
  private idrow:any;
  private _id:any;
  private customers: Customer[];
  private selectedCustomer: Customer;
  private buttondisable:any;
  private buttondisable2:any;
  private events: SelectItem[] = []
  private data: Array<any> = []
  private eventidname: String = null;
  private selectedEvent: any;
  private showfilter:boolean=false;
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);  
  private msgs: Message[] = [];

  constructor(protected service: GenerateBarcodeService,private router: Router, private route: ActivatedRoute,
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

    this.namaQR = 'Belum Pilih Nama';
    this.buttondisable = true;
    this.buttondisable2 = false;
  }


  ngOnInit(): void {
  }



onChangeCombo(eventidname){
  if(eventidname){
    sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
    this.eventidname = eventidname;
    this.busyloadevent.busy= this.service.getCustomerConfirmed(this.eventidname['id']).then((data) => {
      this.customers=data;
    });  

    this.service.GettingChosenTemplate(this.eventidname['id']).then((response)=>
      {
        this.id = response
        if(this.id[0]==undefined){
          this.TemplateName='Belum Pilih Template';     
        }else{
          this.TemplateName=this.id[0].NamaTemplate;
          this.TemplateQR=this.id[0];
        }
      }
      ,err => {this.TemplateName='Belum Pilih Template';}); 
  } else {
    sessionStorage.removeItem('selectedEvent');
    this.customers=[];
  }                     
}

  hiddenbutton(){
     if(this.TemplateName=='Belum Pilih Template'){
       return true
     }else{
        return false
     }
  }

   rowSelected(event): void {
      this.idrow = this.customers.indexOf(this.selectedCustomer);
      this.namaQR = event.data.firstname + ' ' + event.data.lastname;
      this._id = event.data._id
   }


   choosetemplate():void{
    if (this.eventidname){      
      this.router.navigate(['pages/occasion/templatebarcode',this.eventidname['id'], this.eventidname['name']]);
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'please choose event name'});
    } 
   }

  


}
