import { Routes, RouterModule, CanActivate }  from '@angular/router';

import { Events } from './events.component';
import { CustomerList } from './components/customerList/customerList.component';
import { UploadExcel } from './components/uploadExcel/uploadExcel.component';
import { CustomerForm } from './components/customerForm/customerForm.component';

import { AuthGuard } from '../login/auth-guard.service';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Events,
    children: [
      { path: 'customers', component: CustomerList },
      { path: 'uploadexcel', component: UploadExcel },
      { path: 'customerform/:custid/:eventid/:eventname', component: CustomerForm }
    ],
    canActivate: [AuthGuard],
  }
];

export const routing = RouterModule.forChild(routes);
