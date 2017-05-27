import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms'
import { Sponsor, SponsorshipService } from './sponsorship.service';
import { layoutPaths } from '../../../../theme/theme.constants';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';
@Component({
  selector: 'Sponsor',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./sponsorship.scss')],
  template: require('./sponsorship.html'),
  providers: [SponsorshipService]
})


export class Sponsorship implements OnInit {
private form: FormGroup;
private _timer: any;
private sponsorId: any;
private eventId: any;
private eventName: any;
private busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
private datavisitor: any;

  constructor(
    public fb: FormBuilder, 
    public _SponsorService: SponsorshipService,
    private router: Router,
    private actroute: ActivatedRoute
    ) {
    this.form = this.fb.group({
      sponsor_name: ['', Validators.required],
      sponsor_address: ['', Validators.required],
      city_state: ['', Validators.required],
      join_date: '',
      category_tag: ['', Validators.required],
      brand_tag: ['', Validators.required],
      contact_person:['', Validators.required],
      booth_no:['', Validators.required],
      email:['', Validators.required],   
      user_id:['', Validators.required],   
      event_id:['', Validators.required],   
      event_name:['', Validators.required],
      password: ''
    });
   }

  ngOnInit() {

    this.sponsorId = this.actroute.snapshot.params['sponsorid'];
    this.eventId = this.actroute.snapshot.params['eventid'];
    this.eventName = this.actroute.snapshot.params['eventname'];
    this.form.patchValue({
      user_id: localStorage.getItem('profile'),
      event_id: this.eventId,
      event_name: this.eventName
    })

      this.busyloadevent.template =  `
            <div style="position: absolute; padding-top:1px; text-align: center; font-size: 14px; ">
                <i class="fa fa-spinner fa-spin" style="font-size:14px"></i>  
                {{message}}
            </div>`
      this.busyloadevent.busy = this._SponsorService.getSponsor(this.sponsorId).subscribe(
        data => {
          this.form = this.fb.group({
            sponsor_name:  [data.sponsor_name, Validators.required],
            sponsor_address:  [data.sponsor_address, Validators.required],
            city_state:  [data.city_state, Validators.required],
            join_date: data.join_date,
            category_tag: [data.category_tag, Validators.required],
            brand_tag: [data.brand_tag, Validators.required],
            contact_person: [data.contact_person, Validators.required],            
            booth_no: [data.booth_no, Validators.required],                       
            email:[data.email, Validators.required],
            user_id:[data.user_id, Validators.required],       
            event_id:[data.event_id, Validators.required],
            event_name:[data.event_name, Validators.required],
            password:[data.password],    
            _id: this.sponsorId
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


      this.busyloadevent.busy= this._SponsorService.getVisitors('didi@yahoo.com').then(
        data => {
          if(data.length){
            this.datavisitor = data;
          } else {
            this.datavisitor = []
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

  }

  public onSubmit(SponsorData:Object):void {

    if(this.sponsorId==''){
      this._SponsorService.createSponsor(SponsorData).subscribe(
      data => {
        console.log('tes data',data);
        this.router.navigate(['pages/company/sponsorship-list']);
      }, //Bind to view
      err => {
        console.log(err);
      });  
    }
    else{
      this._SponsorService.updateSponsor(SponsorData).subscribe(
      data => {
        console.log('update data',data);
        this.router.navigate(['pages/company/sponsorship-list']);        
      }, //Bind to view
      err => {
        console.log(err);
      });   
    }
  }
  public deleteEvent():void {
      this._SponsorService.deleteSponsor(this.form.value['_id']).subscribe(
      data => {
        console.log('berhasil delete',data);
        this.router.navigate(['pages/company/sponsorship-list']);  
      }, //Bind to view
      err => {
        console.log(err);
      });        
    }

  backtolist() {
    this.router.navigate(['pages/company/sponsorship-list']);
  }


}
