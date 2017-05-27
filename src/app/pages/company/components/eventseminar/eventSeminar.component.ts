import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms'
import { Eventt, EventSeminarService } from './eventSeminar.service';
import { layoutPaths } from '../../../../theme/theme.constants';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'angular2-busy';
@Component({
  selector: 'Event-Seminar',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./eventSeminar.scss')],
  template: require('./eventSeminar.html'),
  providers: [EventSeminarService]
})


export class EventSeminar implements OnInit {
  private form: FormGroup;
  private _timer: any;
  private eventId: any;
  private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(
    public fb: FormBuilder, 
    public _EventSeminarService: EventSeminarService,
    private router: Router,
    private actroute: ActivatedRoute
    ) {
    this.form = this.fb.group({
      event_name: ['', Validators.required],
      event_location: ['', Validators.required],
      category: ['', Validators.required],
      event_date: '',
      city_state: ['', Validators.required],
      event_address: ['', Validators.required],
      num_of_participant: 0,      
      eo_email:['', Validators.required],
    });
    this.form.patchValue({
      eo_email: localStorage.getItem('profile')
    })

   }

  ngOnInit() {
        this.eventId = this.actroute.snapshot.params['eventid'];

    this.busyloadevent.template =  `
            <div style="position: absolute; padding-top:1px; text-align: center; font-size: 14px; ">
                <i class="fa fa-spinner fa-spin" style="font-size:14px"></i>  
                {{message}}
            </div>`
    this.busyloadevent.busy = this._EventSeminarService.getEventSeminar(this.eventId).subscribe(
        data => {
          console.log(data);

          this.form = this.fb.group({
            event_name:  [data.event_name, Validators.required],
            event_location:  [data.event_location, Validators.required],
            category:  [data.category, Validators.required],
            event_date: data.event_date,
            city_state: [data.city_state, Validators.required],
            event_address: [data.event_address, Validators.required],
            num_of_participant: [data.num_of_participant, Validators.required],
            eo_email:[data.eo_email, Validators.required],
            _id: this.eventId
          });
        },
        err => {
          if (err=='Data not found!'){
          } else {
            console.log("error",err);
          }
        },
        () => console.log('Task Complete')
      )       

  }

  public onSubmit(EventSeminarData:Object):void {
    this.form.patchValue({
      eo_email: localStorage.getItem('profile')
    })
    if(this.eventId==''){
      console.log('object data',EventSeminarData);
      this._EventSeminarService.createEventSeminar(EventSeminarData).subscribe(
      data => {
        this.router.navigate(['pages/company/eventseminar-list']);
      }, //Bind to view
      err => {
        console.log(err);
      });  
    }
    else{
      this._EventSeminarService.updateEventSeminar(EventSeminarData).subscribe(
      data => {
        this.router.navigate(['pages/company/eventseminar-list']);        
      }, //Bind to view
      err => {
        console.log(err);
      });   
    }
  }
  public deleteEvent():void {
      this._EventSeminarService.deleteEventSeminar(this.form.value['_id']).subscribe(
      data => {
        this.router.navigate(['pages/company/eventseminar-list']);  
      }, //Bind to view
      err => {
        console.log(err);
      });        
    }

  backtolist() {
    this.router.navigate(['pages/company/eventseminar-list']);
  }


}
