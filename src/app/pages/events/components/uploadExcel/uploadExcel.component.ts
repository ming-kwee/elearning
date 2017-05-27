import { Component, ViewEncapsulation } from '@angular/core';
/* Or straight forward import */
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {  Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';
// get data list event seminar
import { Eventt, EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'basic-form',
  template: require('./uploadExcel.html'),
  styles: [require('./uploadExcel.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class UploadExcel {
  private filesToUpload: Array<File>;
  private events: SelectItem[] = []
  private data: Array<any> = []
  private freshdataheader: any
  private freshdata: Array<any> = []
  private olddataheader: any 
  private olddata: Array<any> = [] 

  private eventidname: String = null;
  private selectedEvent: any;
  private showfilter:boolean=false;
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  private msgs: Message[] = [];
  private confmsgs: Message[] = [];
  private stepStatus = "Finish"

  constructor(
      private router:Router,
      private global: GlobalState,
      public eventService: EventSeminarService) {
    this.filesToUpload = [];

    
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
        console.log(err);
      }
    );

  }



onChangeCombo(eventidname){
  if (eventidname){
    sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
    this.eventidname = eventidname;
  } else {
    sessionStorage.removeItem('selectedEvent');
  } 
}

 
  upload() {
    if (this.eventidname){    
        this.freshdataheader=[]
        this.olddataheader=[]
        let user = localStorage.getItem('profile');
        let eventid = this.eventidname['id'];
        let eventname = this.eventidname['name'];        
        this.makeFileRequest(this.global.GlobalUrl+"/customerlist/upload/"+ user + "/" + eventid + "/" + eventname + "/" + this.stepStatus, [], this.filesToUpload).then((result) => {
            // console.log('hehe0',result.data);
            if (result['error_code'] == 1) {
                this.msgs.push({severity:'error', summary:'Info Message', detail:result['err_desc']});
            } else {
                // this.msgs.push({severity:'success', summary:'Info Message', detail:'Upload Success...'});
            }
            this.freshdata= result["data"].new;
            this.freshdataheader.push(result["data"].new[0]);
            this.olddata= result["data"].old;


            this.freshdata.map( dat => {
              for (let dat2 of this.olddata) {                
                if (dat["email"]==dat2["email"]){
                    delete dat2._id;
                    delete dat2.event_id;
                    delete dat2.event_name;
                    dat.old= dat2;
                    break;
                }
              }
            })
            this.confmsgs = []
            this.confmsgs.push({severity:'info', summary:'Click Process Upload if already sure for upload', 
            detail:''});
            this.confmsgs.push({severity:'info', summary:'', 
            detail:'Anda memiliki ' + this.freshdata.length + ' record untuk diupload'});
            this.confmsgs.push({severity:'info', summary:'', 
            detail:'dan ' + this.olddata.length + ' record yang konflik '});
            
            if(this.stepStatus=="Verify Data"){
              this.stepStatus="Process Upload"
            } else if (this.stepStatus=="Process Upload"){
              this.stepStatus="Finish"
              this.confmsgs = []
              this.confmsgs.push({severity:'info', summary:'', 
              detail:'Finish Upload Data'});
            }

        }, (error) => {
            if (error == 'You are not authorized') {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('profile');
                this.router.navigate(['/login']);
            }
        });
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'please choose event name'});
    }          
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
    this.stepStatus = "Verify Data";
    this.confmsgs = []
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var token = localStorage.getItem('auth_token');
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            //  return this.http.put(this.global.GlobalUrl+`/customerlist/update`, body, options) 
            xhr.open("POST", url, true);
            // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("x-access-token", token);
            xhr.send(formData);
        });
    }

}
