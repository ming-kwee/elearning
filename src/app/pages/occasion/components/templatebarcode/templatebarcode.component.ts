import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router }            from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { QRCodeComponent } from 'angular2-qrcode';
import { GenerateBarcodeService } from '../generatebarcode/generatebarcode.service';

import { Template1 } from '../template1/template1.component';
import { Template2 } from '../template2/template2.component';
import { Template3 } from '../template3/template3.component';

@Component({
  selector: 'templatebarcode',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./templatebarcode.scss')],
  template: require('./templatebarcode.html')
})
export class TemplateBarcode implements OnInit {
private eventId: any;
private eventName: any;
  constructor(private actroute: ActivatedRoute,
    private location: Location,
    private router: Router,
    protected servicebarcode: GenerateBarcodeService)
   { 
     this.buttondisable = false;
     this.buttondisable2 = true;
   }

  json:any={}


  items:any;
  sizes:any=[];
  FontFamilies:any;
  buttondisable:any;
  buttondisable2:any;


  ngOnInit(): void {
    this.eventId = this.actroute.snapshot.params['id'];
    console.log('iciciciic', this.eventId)
    this.eventName = this.actroute.snapshot.params['name'];    
     this.sizes=['8px','9px','10px','11px','12px','13px','14px','15px','16px','17px','18px','19px','20px']
     this.FontFamilies = ['Arial','Arial Black','Arial Narrow','Avant Garde','Comic Sans MS','Courier New','Georgia','Helvetica','Helvetica Neue','Impact','Lucida Bright','Papyrus','Roboto','sans-serif','Segoe UI','Tahoma','Times New Roman','Verdana'];

    //  this.items=JSON.parse(localStorage.getItem('tblQR'))
     this.servicebarcode.LoadTemplateSetting(this.eventId).then((response) =>
        {  
          console.log('yyyyy', response.length)
          if (response.length === 0) {
            this.json.BoldCompany=true

            this.json.event="JUDUL EVENT"
            this.json.SizeEvent=this.sizes[4];
            this.json.FontFamilyEventSelected=this.FontFamilies[12];
            this.json.EventBold = "Normal"
            this.json.ColorEvent = "#000000";

            this.json.venue="LOKASI EVENT"
            this.json.SizeVenue=this.sizes[4];
            this.json.FontFamilyVenueSelected=this.FontFamilies[12];
            this.json.VenueBold = "Normal"
            this.json.ColorVenue = "#000000";

            this.json.eventdate="TANGGAL EVENT"
            this.json.SizeEventDate=this.sizes[4];
            this.json.FontFamilyEventDateSelected=this.FontFamilies[12];
            this.json.EventDateBold = "Normal"
            this.json.ColorEventDate = "#000000";

            this.json.company="NAMA COMPANY"
            this.json.SizeCompany=this.sizes[4];
            this.json.FontFamilyCompanySelected=this.FontFamilies[12];
            this.json.CompanyBold = "Bold"
            this.json.ColorCompany = "#000000";
            
            this.json.SizeNama=this.sizes[4];
            this.json.FontFamilyNamaSelected=this.FontFamilies[12];
            this.json.NamaBold = "Normal"
            this.json.ColorNama = "#000000";

            this.json.ColorBackground = "#ffffff"
          }else{
            this.json.event=response[0].event
            this.json.SizeEvent=response[0].SizeEvent
            this.json.FontFamilyEventSelected=response[0].FontFamilyEventSelected
            this.json.EventBold = response[0].EventBold
            this.json.BoldEvent = response[0].BoldEvent
            this.json.ColorEvent = response[0].ColorEvent

            this.json.venue=response[0].venue
            this.json.SizeVenue=response[0].SizeVenue
            this.json.FontFamilyVenueSelected=response[0].FontFamilyVenueSelected
            this.json.VenueBold = response[0].VenueBold
            this.json.BoldVenue = response[0].BoldVenue
            this.json.ColorVenue = response[0].ColorVenue

            this.json.eventdate=response[0].eventdate
            this.json.SizeEventDate=response[0].SizeEventDate
            this.json.FontFamilyEventDateSelected=response[0].FontFamilyEventDateSelected
            this.json.EventDateBold = response[0].EventDateBold
            this.json.BoldEventDate = response[0].BoldEventDate
            this.json.ColorEventDate = response[0].ColorEventDate

            this.json.company=response[0].company
            this.json.SizeCompany=response[0].SizeCompany
            this.json.FontFamilyCompanySelected=response[0].FontFamilyCompanySelected
            this.json.CompanyBold = response[0].CompanyBold
            this.json.BoldCompany = response[0].BoldCompany
            this.json.ColorCompany = response[0].ColorCompany
            
            this.json.SizeNama=response[0].SizeNama
            this.json.FontFamilyNamaSelected=response[0].FontFamilyNamaSelected
            this.json.NamaBold = response[0].NamaBold
            this.json.BoldNama = response[0].BoldNama
            this.json.ColorNama = response[0].ColorNama

            this.json.ColorBackground = response[0].ColorBackground
          }
        }, 
        err => {
                alert('Gagal load data template!')
        });
    
}

Bolding(): void{
  if (this.json.BoldEvent==true){
    this.json.EventBold = "Bold"
  }else{
    this.json.EventBold = "Normal"
  }
  if (this.json.BoldVenue==true){
    this.json.VenueBold = "Bold"
  }else{
    this.json.VenueBold = "Normal"
  }
  if (this.json.BoldEventDate==true){
    this.json.EventDateBold = "Bold"
  }else{
    this.json.EventDateBold = "Normal"
  }
  if (this.json.BoldCompany==true){
    this.json.CompanyBold = "Bold"
  }else{
    this.json.CompanyBold = "Normal"
  }
  if (this.json.BoldNama==true){
    this.json.NamaBold = "Bold"
  }else{
    this.json.NamaBold = "Normal"
  }
}

  onCreate(): void {
    this.items={ 
                event_id: this.eventId, 
                event: this.json.event,
                BoldEvent: this.json.BoldEvent,
                EventBold: this.json.EventBold,
                SizeEvent: this.json.SizeEvent,
                FontFamilyEventSelected: this.json.FontFamilyEventSelected,
                ColorEvent: this.json.ColorEvent,

                venue: this.json.venue,
                BoldVenue: this.json.BoldVenue,
                VenueBold: this.json.VenueBold,
                SizeVenue: this.json.SizeVenue,
                FontFamilyVenueSelected: this.json.FontFamilyVenueSelected,
                ColorVenue: this.json.ColorVenue,

                eventdate: this.json.eventdate,
                EventDateBold: this.json.EventDateBold,
                BoldEventDate: this.json.BoldEventDate,
                SizeEventDate: this.json.SizeEventDate,
                FontFamilyEventDateSelected: this.json.FontFamilyEventDateSelected,
                ColorEventDate: this.json.ColorEventDate,

                company: this.json.company,
                CompanyBold: this.json.CompanyBold,
                BoldCompany: this.json.BoldCompany,
                SizeCompany: this.json.SizeCompany,
                FontFamilyCompanySelected: this.json.FontFamilyCompanySelected,
                ColorCompany: this.json.ColorCompany,

                BoldNama: this.json.BoldNama,
                NamaBold: this.json.NamaBold,
                SizeNama: this.json.SizeNama,
                FontFamilyNamaSelected: this.json.FontFamilyNamaSelected,
                ColorNama: this.json.ColorNama,
                
                ColorBackground: this.json.ColorBackground
                }

        this.servicebarcode.SaveTemplateSetting(this.items).then((response)=>
          {
              alert('Setting template berhasil tersimpan');
          }
          ,err => alert('Setting template gagal tersimpan'));

        // let data = [];
        // data.push(this.items);
        // localStorage.setItem('tblQR', JSON.stringify(data));
        // alert('Setting template berhasil tersimpan');
  }

  reset():void {
      this.json.BoldCompany=true

      this.json.event="JUDUL EVENT"
      this.json.SizeEvent=this.sizes[4];
      this.json.FontFamilyEventSelected=this.FontFamilies[12];
      this.json.EventBold = "Normal"
      this.json.ColorEvent = "#000000";

      this.json.venue="LOKASI EVENT"
      this.json.SizeVenue=this.sizes[4];
      this.json.FontFamilyVenueSelected=this.FontFamilies[12];
      this.json.VenueBold = "Normal"
      this.json.ColorVenue = "#000000";

      this.json.eventdate="TANGGAL EVENT"
      this.json.SizeEventDate=this.sizes[4];
      this.json.FontFamilyEventDateSelected=this.FontFamilies[12];
      this.json.EventDateBold = "Normal"
      this.json.ColorEventDate = "#000000";

      this.json.company="NAMA COMPANY"
      this.json.SizeCompany=this.sizes[4];
      this.json.FontFamilyCompanySelected=this.FontFamilies[12];
      this.json.CompanyBold = "Bold"
      this.json.ColorCompany = "#000000";
      
      this.json.SizeNama=this.sizes[4];
      this.json.FontFamilyNamaSelected=this.FontFamilies[12];
      this.json.NamaBold = "Normal"
      this.json.ColorNama = "#000000";

      this.json.ColorBackground = "#ffffff"
  }

  goBack(): void {
    this.router.navigate(['pages/occasion/generatebarcode'])
  }
}
