import { Routes, RouterModule, CanActivate }  from '@angular/router';

import { Reports } from './reports.component';
import { CustomerAttend } from './components/customers/customerAttend.component';
import { SponsorAttend } from './components/sponsors/sponsorAttend.component';


const routes: Routes = [
  {
    path: '',
    component: Reports,
    children: [
      { path: 'customerAttend', component: CustomerAttend },
      { path: 'sponsorAttend', component: SponsorAttend },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
