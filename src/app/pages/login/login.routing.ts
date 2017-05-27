import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';
import { Dashboard } from '../../pages/dashboard/dashboard.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Login
  }
];

export const routing = RouterModule.forChild(routes);
