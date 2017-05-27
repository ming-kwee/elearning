import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages3.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages3} from './pages3.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages3],
  providers: [
    AuthService,
    AuthGuard,   
  ]
})
export class Pages3Module {
}
