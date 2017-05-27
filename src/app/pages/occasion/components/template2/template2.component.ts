import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router }            from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { QRCodeComponent } from 'angular2-qrcode';
import { GenerateBarcodeService } from '../generatebarcode/generatebarcode.service';

@Component({
  selector: 'template2',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./template2.scss')],
  template: require('./template2.html')
})
export class Template2 implements OnInit{
  @Input() TemplateSetting;
  @Input() QRBarcodeText;
  @Input() TemplateChooseDisable;
  @Input() PrintDisable;
  @Input() NamaVisitor;
  @Input() IDRow;
  @Input() IDVisitor;
  @Input() EventIdName;  
  @Input() EventId;  
  @Input() EventName;   
  user:any;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    protected servicebarcode: GenerateBarcodeService){}

   ngOnInit(): void {
     console.log('=====>',this.EventId);
    if(this.QRBarcodeText == undefined){
      this.QRBarcodeText = 'Contoh';
    };
    
    if(this.NamaVisitor == undefined){
      this.NamaVisitor = 'Nama';
    };
    this.user = localStorage.getItem('profile');
   }

pilihTemplate(Template):void {
    this.TemplateSetting['NamaTemplate'] = Template;
    this.TemplateSetting['user'] = this.user;
    this.TemplateSetting['event_id'] = this.EventId;
    this.TemplateSetting['event_name'] = this.EventName;       
    this.servicebarcode.SaveChosenTemplate(this.TemplateSetting).then((response)=>
          {
              this.router.navigate(['pages/occasion/generatebarcode'])
          }
          ,err => alert('Template terpilih gagal tersimpan'));
    
}

printDiv() 
      {
        if(this.NamaVisitor=='Belum Pilih Nama'){
          alert('Belum Pilih Nama');
        }else{
          var contentToPrint= $('#Template2').html()

          var newWin=window.open('','Print-Window');

          newWin.document.open();

          newWin.document.write(
              '<html>'+
              '<head>'+
              '<style>'+
                '@page {'+
                    'size:landscape;'+
                    'margin:0.5mm;'+
                '}'+
                '@media print {'+    
                  '#printButton'+
                      '{'+
                          'display: none !important;'+
                      '}'+
                  '}'+
              '</style>'+
              '</head>'+
              '<body>'+contentToPrint+'<button id="printButton" onclick="printing()">Print</button>'+
                '<script>'+
                'function printing() {'+
                    'window.print();'+
                    'CheckWindowState();'+
                '}'+
                'function CheckWindowState() {'+
                    'if(document.readyState=="complete"){'+
                      'window.close()'+
                    '}else{'+
                      'setTimeout("CheckWindowState()", 2000)'+
                    '}'+
                '}'+
              '</script>'+
              '</body></html>');

          newWin.document.close();

          // setTimeout(function(){newWin.close();},1000);

          this.servicebarcode.update(this.IDRow, this.IDVisitor).then((response)=> {    
            // this.servicebarcode.getData().then((data) => {
            //   this.customers=data;;
            // });
          });

        }
   }
}
