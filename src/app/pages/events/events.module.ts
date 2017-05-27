import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './events.routing';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Events } from './events.component';
// import { BasicTables } from './components/basicTables/basicTables.component';
import { CustomerList } from './components/customerList/customerList.component';

import { UploadExcel } from './components/uploadExcel/uploadExcel.component';
import { CustomerForm } from './components/customerForm/customerForm.component';

import { Inputs } from './components/inputs';
import { Layouts } from './components/layouts';

import {DataTableModule,SharedModule, DialogModule, CalendarModule, ButtonModule, DropdownModule, MessagesModule, GrowlModule} from 'primeng/primeng';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomerListService } from './components/customerList/customerList.service';
import { AuthService } from '../login/auth.service';
import { AuthGuard } from '../login/auth-guard.service';
// get data list event seminar
import { EventSeminarService } from '../company/components/eventseminar/eventSeminar.service';
import { BusyModule } from 'angular2-busy';
import { KeysPipe }       from './events.pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
    RatingModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    GrowlModule,
    ReactiveFormsModule,
    BusyModule,
    MessagesModule

  ],
  declarations: [
    Events,
    CustomerList,
    UploadExcel,
    CustomerForm,
    KeysPipe

  ],
  providers: [
    EventSeminarService,
    AuthService,
    AuthGuard,
    CustomerListService
  ]
})
export default class EventsModule {}
