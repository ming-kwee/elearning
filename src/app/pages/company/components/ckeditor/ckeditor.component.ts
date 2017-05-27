import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Template, TemplateService } from './ckeditor.service';
import { Eventt, EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
import './ckeditor.loader';
import 'ckeditor';
import 'style-loader!./ckeditor.scss';
import {  Router } from '@angular/router';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';

@Component({
  selector: 'ckeditor-component',
  templateUrl: './ckeditor.html',
  providers: [TemplateService],
  encapsulation: ViewEncapsulation.Emulated,
})

export class Ckeditor implements OnInit {
  private ckeditorContent:string = '';
  private config = { uiColor: '#F0F3F4', height: '500' };
  private events: SelectItem[] = []  
  private eventidname: String = null;
  private data: Array<any> = []
  private selectedEvent: any;
  private showfilter:boolean=false;
  private msgs: Message[] = [];
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(public _TemplateService: TemplateService, public eventService: EventSeminarService,
  public router:Router) {
    this.busyloadevent.template = `<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>{{message}}`
    this.busyloadevent.busy=this.eventService.getActiveEventSeminar(localStorage.getItem('profile')).subscribe(
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

        if (err._body == 'You are not authorized' && err.status == 500 ) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('profile');
          this.router.navigate(['/login']);
        }        
        console.log(err);
      }
    );
  }

  ngOnInit() {

  }

ngAfterViewInit(){

}

onChangeCombo(eventidname){
  if (eventidname){
    sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
    this.eventidname = eventidname;
    this.busyloadevent.busy=this._TemplateService.getTemplate(this.eventidname['id']).subscribe(
      data => {      
        if(data==null){
          this.ckeditorContent = '<p> Dear {{customer_name}} </p>' +
          '<p><em>ketik content disini...</em></p>' +
          '<hr>'+
          `Untuk dapat melakukan reservasi tempat kami perlu anda untuk mengkonfirmasi kedatangan dengan menekan link dibawah ini.
          <ul><li>{{yes}}, saya ingin menghadiri acara ini. 
          </li>
          <li>
              {{no}}, saya tidak dapat menghadiri acara ini.
          </li>
          </ul>
          <p>Terima kasih atas partisipasi anda</p>`;        
        } else {
          this.ckeditorContent = data.template_body;
        }          
      },
      err => {
        console.log("error",err);
      },
      () => console.log('Task Complete')
    )  
  } else {
    sessionStorage.removeItem('selectedEvent');
  }                 
}


  public save():void{
    if (this.eventidname){
      var TemplateObj = {
        template_body: this.ckeditorContent,
        user: localStorage.getItem('profile'),
        event_id: this.eventidname['id'],
        event_name: this.eventidname['name']
      }

      this.busyloadevent.busy=this._TemplateService.updateinsertTemplate(TemplateObj).subscribe(
        data => {
          this.msgs.push({severity:'info', summary:'Info Message', detail:'Berhasil submit'});
        }, //Bind to view
        err => {
          console.log(err);
        });
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'please choose event name'});
    }    
  }
}
