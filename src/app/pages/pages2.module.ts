import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages2.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages2 } from './pages2.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages2],
  providers: [
    AuthService,
    AuthGuard,   
  ]
})
export class Pages2Module {
}
