import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'confirm',
  template: require('./confirm.html'),
  styles: [require('./confirm.scss')],
})
export class ConfirmComponent {

    public headerConfirm = 'Prosessing...';
    public detailConfirm = '';
    public UID;
    public status;
    public errorMsg;

    constructor(public router:Router,private actroute: ActivatedRoute, public service: ConfirmService) {
        this.UID = this.actroute.snapshot.params['id'];
        this.status = this.actroute.snapshot.params['status'];
        this.service.getCustomerById(this.UID).then(
                data  => {
                  console.log(data.firstname);
                  if (this.status == 'Confirmed') {
                      this.headerConfirm = 'Hallo, '+ data.firstname + ' ' + data.lastname;
                      this.detailConfirm = 'Selamat, Anda telah menyanggupi untuk datang ke seminar';
                  } else {
                      this.headerConfirm = 'Hallo, '+ data.firstname + ' ' + data.lastname;
                      this.detailConfirm = 'Anda baru saja membatalkan untuk datang ke seminar';
                  }
                },
                error => {
                    this.errorMsg = <any>error._body;
                    alert(this.errorMsg);
                    this.headerConfirm = 'Mohon maaf, Anda tidak terdaftar di database kami';
                    this.detailConfirm = '';
                });
    }


}