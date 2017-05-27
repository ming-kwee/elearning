import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './occasion.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Occasion } from './occasion.component';
import { SafeHtmlPipe } from './components/generatebarcode/safeHtml.pipe';
import { GenerateBarcode } from './components/generatebarcode/generatebarcode.component';
import { TemplateBarcode } from './components/templatebarcode/templatebarcode.component';
import { Template1 } from './components/template1/template1.component';
import { Template2 } from './components/template2/template2.component';
import { Template3 } from './components/template3/template3.component';
import {DataTableModule,SharedModule, DropdownModule, GrowlModule} from 'primeng/primeng';
// get data list event seminar
import { Eventt, EventSeminarService } from '../company/components/eventseminar/eventSeminar.service';
import {BusyModule} from 'angular2-busy';
import { GenerateBarcodeService } from './components/generatebarcode/generatebarcode.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QRCodeModule } from 'angular2-qrcode';
import {ColorPickerModule} from 'angular2-color-picker';


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    Ng2SmartTableModule,
    routing,
    QRCodeModule,
    ColorPickerModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    DropdownModule,
    BusyModule
  ],
  declarations: [
    // Inputs,
    // Layouts,
    Occasion,
    GenerateBarcode,
    TemplateBarcode,
    SafeHtmlPipe,
    Template1,
    Template2,
    Template3
    // CustomerList
    // StandardInputs,
    // ValidationInputs,
    // GroupInputs,
    // CheckboxInputs,
    // Rating,
    // SelectInputs,
    // InlineForm,
    // BlockForm,
    // HorizontalForm,
    // WithoutLabelsForm
  ],
  providers: [
      GenerateBarcodeService,
      EventSeminarService
  ]
})
export default class FormsModule {
}
