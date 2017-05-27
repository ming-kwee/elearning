import { Routes, RouterModule }  from '@angular/router';
import { Pages2 } from './pages2.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages2',
    component: Pages2,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => System.import('./home/home.module') },
   
      // { path: 'mapgallery', loadChildren: () => System.import('./mapgallery/mapgallery.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
