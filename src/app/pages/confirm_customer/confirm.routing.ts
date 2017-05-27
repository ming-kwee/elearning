import { Routes, RouterModule }  from '@angular/router';
import { ConfirmComponent } from './confirm.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmComponent
  }
];

export const routing = RouterModule.forChild(routes);