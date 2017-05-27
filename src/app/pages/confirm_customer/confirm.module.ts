import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { routing } from './confirm.routing';

import { NgaModule } from '../../theme/nga.module';

import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ConfirmService } from './confirm.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    DropdownModule,
    ModalModule
  ],
  declarations: [
    ConfirmComponent
  ],
  providers: [
    ConfirmService
  ]
})
export default class NewModule {}