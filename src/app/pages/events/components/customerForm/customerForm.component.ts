import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl,  Validators} from '@angular/forms';
import {EmailValidator} from '../../../../theme/validators';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomerListService } from '../customerList/customerList.service';

@Component({
  selector: 'customer-form',
  styles: [require('./customerForm.scss')],
  template: require('./customerForm.html'),
})
export class CustomerForm implements OnInit {



  public form:FormGroup;
  public firstname:AbstractControl;
  public lastname:AbstractControl;
  public jobtitle:AbstractControl;
  public email:AbstractControl;
  public gender:AbstractControl;
  public phone:AbstractControl;
  public errorMsg: String;
  public UID: any = 'new';
  private eventId: any;
  private eventName: any;
  public submitted:boolean = false;

  constructor(public fb:FormBuilder, public router:Router,private actroute: ActivatedRoute, protected service: CustomerListService) {

    this.form = this.fb.group({
      'firstname': ['', Validators.compose([Validators.required])],
      'lastname': ['', Validators.compose([Validators.required])],
      'jobtitle': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'gender': [''],
      'phone': ['', Validators.compose([Validators.required])],
      user_id:['', Validators.required],   
      event_id:['', Validators.required],   
      event_name:['', Validators.required]        
    });

      this.firstname = this.form.controls['firstname'];
      this.lastname = this.form.controls['lastname'];
      this.jobtitle = this.form.controls['jobtitle'];
      this.email = this.form.controls['email'];
      this.gender = this.form.controls['gender'];
      this.phone = this.form.controls['phone'];

  }

  ngOnInit() { 
    this.UID  = this.actroute.snapshot.params['custid'];
    this.eventId = this.actroute.snapshot.params['eventid'];
    this.eventName = this.actroute.snapshot.params['eventname'];
    this.form.patchValue({
      user_id: localStorage.getItem('profile'),
      event_id: this.eventId,
      event_name: this.eventName
    })
      if (this.UID !== 'new') {

        this.service.getCustomerById(this.UID).then(
                data  => {
                  console.log(data.firstname);
                  this.form = this.fb.group({
                    'firstname':  [data.firstname, Validators.compose([Validators.required])],
                    'lastname':  [data.lastname, Validators.compose([Validators.required])],
                    'jobtitle':  [data.jobtitle, Validators.compose([Validators.required])],
                    'email': [data.email, Validators.compose([Validators.required, EmailValidator.validate])],
                    'gender': [data.gender],
                    'phone': [data.phone, Validators.compose([Validators.required])],
                    user_id:[data.user_id, Validators.required],       
                    event_id:[data.event_id, Validators.required],
                    event_name:[data.event_name, Validators.required],                      
                    _id: this.UID
                  });

                  this.firstname = this.form.controls['firstname'];
                  this.lastname = this.form.controls['lastname'];
                  this.jobtitle = this.form.controls['jobtitle'];
                  this.email = this.form.controls['email'];
                  this.gender = this.form.controls['gender'];
                  this.phone = this.form.controls['phone'];                
                },
                error => {
                    this.errorMsg = <any>error._body;
                    alert(this.errorMsg);
                });
      }
      
  }

  public Simpan(values:Object): void {
    this.submitted = true;
    if (this.form.valid) {

      if (this.UID == 'new') {
        this.service.Simpan(values)
          .then(
            data  => {
              if (data['insertedCount'] == 1) {
                alert('new customers successfully created')
                this.router.navigate(['pages/events/customers']);
              }
            },
            error => {
                this.errorMsg = <any>error._body;
                alert(this.errorMsg);
            });
      } else {
        this.service.Update(values)
          .then(
            data  => {
              console.log(data)
              if (data['ok'] == 1) {
                alert('customers successfully updated')
                this.router.navigate(['pages/events/customers']);
              }
            },
            error => {
                this.errorMsg = <any>error._body;
                alert(this.errorMsg);
            });
      }


    }
  }

  backToCustomerList() {
    this.router.navigate(['pages/events/customers']);
  }
}
