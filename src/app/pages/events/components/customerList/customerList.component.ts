import {Component, ViewEncapsulation} from '@angular/core';
import { CustomerListService } from './customerList.service';
import { Customer } from './customer';
import {  Router } from '@angular/router';
import { EventSeminarService } from '../../../company/components/eventseminar/eventSeminar.service';
import { SelectItem, Message } from 'primeng/primeng';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customerList.scss')],
  template: require('./customerList.html')
})


export class CustomerList {
 
  private customers: Customer[];
  private selectedCustomer: Customer;
  private events: SelectItem[] = [];
  private data: Array<any> = [];
  private eventidname: String = null;
  private selectedEvent: any;
  private selectedCustomers: any;
  private showfilter:boolean=false;  
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  private msgs: Message[] = [];

  constructor(protected service: CustomerListService,  public router:Router,
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



  };


  
  onChangeCombo(eventidname){
    if(eventidname){
      sessionStorage.setItem('selectedEvent', JSON.stringify(eventidname));
      this.eventidname = eventidname;
      this.busyloadevent.busy= this.service.getRepos(this.eventidname['id']).then(
        data => {
          if(data.length){
            this.customers = data;
          } else {
            this.customers = []
          }
        }, 
        err => {
          console.log(err);
          if (err._body == 'You are not authorized' && err.status == 500 ) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('profile');
            this.router.navigate(['/login']);
          }
        }
      );



    } else {
      sessionStorage.removeItem('selectedEvent');
      this.customers=[];
    }     
  }



  deleteWithSelected(selectedCustomers: Array<Customer>) {
    
    if (selectedCustomers) {
        if (selectedCustomers.length > 0) {
          var deleteFlag = false;

            for (var i = 0; i < selectedCustomers.length; i++) {
              for (var ii = 0; ii < this.customers.length; ii++) {
                if (selectedCustomers[i]._id == this.customers[ii]._id) {

                  this.service.deleteData(selectedCustomers[i]._id).subscribe(
                    data => {
                      deleteFlag = true;                      
                      this.customers.splice(ii, 1);
                    }, 
                    err => {
                      console.error(err);
                      if (err._body == 'You are not authorized' && err.status == 500 ) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('profile');
                        this.router.navigate(['/login']);
                      }
                        deleteFlag = false;
                        this.msgs.push({severity:'error', summary:'Info Message', detail:err});
                    });   
                    if (deleteFlag) {
                        // alert("Data successfully deleted");
                    };
                  break;
                };
              };
            }; 

             

        } else {
          this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
        };
     } else {
       this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
     };   
  };


  // function of confirmation 
  confirm(selectedCustomers: Array<Customer>) {
    // validation if data is null
     if (selectedCustomers) {
       // validation if data 0
       if (selectedCustomers.length > 0) {
          var confirmFlag = false;
          for (var i = 0; i < selectedCustomers.length; i++) {
            for (var ii = 0; ii < this.customers.length; ii++) {
              if (selectedCustomers[i]._id == this.customers[ii]._id) {
                  this.customers[ii].status = "Confirmed"    
                  this.service.Confirm(selectedCustomers[i]._id).then(
                    data => {
                      confirmFlag = true;      
                      // ???alert("Status successfully updated");  
                    }, 
                    err => {
                      console.error(err);
                      if (err._body == 'You are not authorized' && err.status == 500 ) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('profile');
                        this.router.navigate(['/login']);
                      }
                        confirmFlag = false;
                        this.msgs.push({severity:'error', summary:'Info Message', detail:err});
                    });   

                break;
              };
            };
          };  
          this.selectedCustomers=[];

        } else {
          this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
        };
     } else {
       this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
     };
  };


  reject(selectedCustomers: Array<Customer>) {
    // validation if data is null
     if (selectedCustomers) {
       // validation if data 0
       if (selectedCustomers.length > 0) {
          var confirmFlag = false;
          for (var i = 0; i < selectedCustomers.length; i++) {
            for (var ii = 0; ii < this.customers.length; ii++) {
              if (selectedCustomers[i]._id == this.customers[ii]._id) {
                  this.customers[ii].status = "Rejected"    
                  this.service.Reject(selectedCustomers[i]._id).then(
                    data => {
                      confirmFlag = true;      
                      // alert("Status successfully updated");                        
                    }, 
                    err => {
                      console.error(err);
                      if (err._body == 'You are not authorized' && err.status == 500 ) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('profile');
                        this.router.navigate(['/login']);
                      }
                        confirmFlag = false;
                        this.msgs.push({severity:'error', summary:'Info Message', detail:err});
                    });   

                break;
              };
            };
          };  
          this.selectedCustomers=[];
        } else {
          this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
        };
     } else {
       this.msgs.push({severity:'warn', summary:'Info Message', detail:'No selected'});
     };
  }

  // function of send email 
  sendInvitation(selectedCustomers: Array<Customer>) {
    let emails: Array<any> = [];    
    if (selectedCustomers) {
      if (selectedCustomers.length > 0) {
        this.msgs.push({severity:'info', summary:'Info Message', detail:'Sending Confirmation Email'});
        for (var i = 0; i < selectedCustomers.length; i++) {
          for (var ii = 0; ii < this.customers.length; ii++) {
            if (selectedCustomers[i]._id == this.customers[ii]._id) {
              emails.push({
                "id": selectedCustomers[i]._id, 
                "name": selectedCustomers[i].firstname+" "+selectedCustomers[i].lastname,
                "email": selectedCustomers[i].email
              });
            };
          };
        };        
        this.service.sendInvitation(emails, this.eventidname['id']).then(
          data => {
            this.msgs.push({severity:'info', summary:'Info Message', detail:'Email Confirmation Sent'});
            this.selectedCustomer = null;
            this.selectedCustomers=[];
          }, 
          err => console.error(err)
            );
      } else {
        this.msgs.push({severity:'warn', summary:'Info Message', detail:'No customer selected'});
      };
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'No customer selected'});
      
    };
  }; 


  addCustomer() {
    if (this.eventidname){
      this.router.navigate(['pages/events/customerform', 'new', this.eventidname['id'], this.eventidname['name']]);
    } else {
      this.msgs.push({severity:'warn', summary:'Info Message', detail:'please choose event name'});
    }          
  } 

  editCustomer(customer: Customer) {
     this.router.navigate(['pages/events/customerform', customer._id, this.eventidname['id'], this.eventidname['name']]);
  }

}




