import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { routing }       from './business.routing';
import { Business } from './business.component';

import { Profile } from './components/profile/profile.component';
import { EventSeminarList } from './components/eventseminar/eventSeminarList.component';
import { EventSeminar } from './components/eventseminar/eventSeminar.component';
import { SponsorshipList } from './components/sponsorship/sponsorshipList.component';
import { Sponsorship } from './components/sponsorship/sponsorship.component';
import { Ckeditor } from './components/ckeditor/ckeditor.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HttpModule } from '@angular/http';
import { DataTableModule,SharedModule, DropdownModule, GrowlModule } from 'primeng/primeng';
import { DatePickerModule } from 'ng2-datepicker';
import { BusyModule } from 'angular2-busy';
// get data list event seminar
import { Eventt, EventSeminarService } from '../company/components/eventseminar/eventSeminar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
    HttpModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDM_izUVfDNPtzrh8JPVwlYIrRNKZdCQ7w'}),
    DataTableModule,
    SharedModule,
    GrowlModule,
    DatePickerModule,
    DropdownModule,
    CKEditorModule,
    BusyModule
  ],
  declarations: [
    Business,
    EventSeminarList,
    SponsorshipList,
    EventSeminar,
    Sponsorship,
    Profile,
    Ckeditor
  ],
  providers: [
    EventSeminarService
  ]
})
export default class BusinessModule {}
