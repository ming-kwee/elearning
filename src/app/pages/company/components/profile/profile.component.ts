import {Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms'
import { Profiler, ProfileService } from './profile.service';
import { layoutPaths } from '../../../../theme/theme.constants';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';
import {Message} from 'primeng/primeng';
@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})


export class Profile implements OnInit {
private form: FormGroup;
private _timer: any;
private UID: any;
private msgs: Message[] = [];

  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  constructor(
    public fb: FormBuilder, 
    public _ProfileService: ProfileService,
    private router: Router,
    private actroute: ActivatedRoute
    ) {
    
    this.form = this.fb.group({
      account_name: ['', Validators.required],      
      company_name: ['', Validators.required],
      company_address: ['', Validators.required],
      category: ['', Validators.required],
      date_join: '',
      city_state: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required]  
    });
    this.form.patchValue({
      email: localStorage.getItem('profile')
    })

   }

  ngOnInit() {
            this.busyloadevent.template =  `
            <div style="position: absolute; padding-top:1px; text-align: center; font-size: 14px; ">
                <i class="fa fa-spinner fa-spin" style="font-size:14px"></i>  
                {{message}}
            </div>`
    this.busyloadevent.busy =this._ProfileService.getProfile(localStorage.getItem('profile')).subscribe(
        data => {
          this.form = this.fb.group({
            account_name:  [data.account_name, Validators.required],            
            company_name:  [data.company_name, Validators.required],
            company_address:  [data.company_address, Validators.required],
            category:  [data.category, Validators.required],
            date_join: data.date_join,
            city_state: [data.city_state, Validators.required],
            email: [data.email, Validators.required],
            phone_number: [data.phone_number, Validators.required]            
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

  public onSubmit(profileData:Object):void {
      this._ProfileService.updateinsertProfile(profileData).subscribe(
      data => {
        this.msgs.push({severity:'info', summary:'Info Message', detail:'Berhasil submit'});
      }, //Bind to view
      err => {
        console.log(err);
      });   
    }
}
