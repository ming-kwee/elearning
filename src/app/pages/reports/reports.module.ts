import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './reports.routing';
import { Reports } from './reports.component';
import { DataTableModule,SharedModule, DialogModule, CalendarModule, ButtonModule, DropdownModule, GrowlModule} from 'primeng/primeng';
import { CustomerAttendService } from './components/customers/customerAttend.service';
import { CustomerAttend } from './components/customers/customerAttend.component';
import { SponsorAttendService } from './components/sponsors/sponsorAttend.service';
import { SponsorAttend } from './components/sponsors/sponsorAttend.component';
import { BusyModule } from 'angular2-busy';
import { EventSeminarService } from '../company/components/eventseminar/eventSeminar.service';
import { KeysPipe }       from './reports.pipes';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DataTableModule,
    SharedModule,
    DialogModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    GrowlModule,
    BusyModule
  ],
  declarations: [
    Reports,
    CustomerAttend,
    SponsorAttend,
    KeysPipe
  ],
  providers: [
    // AuthService,
    EventSeminarService,
    CustomerAttendService,
    SponsorAttendService
  ]
})
export default class ReportsModule {}
