import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers: [
    AuthService,
    AuthGuard,   
  ]
})
export class PagesModule {
}
