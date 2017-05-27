import { Routes, RouterModule }  from '@angular/router';

import { Home } from './home.component';



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
    ]
  },
  {
    path: ':id',
    component: Home,
    children: [
    ]
  }  
];

export const routing = RouterModule.forChild(routes);
