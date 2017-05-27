import { Routes, RouterModule }  from '@angular/router';
import { Pages3 } from './pages3.component';
import { AuthGuard } from './login/auth-guard.service';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages3',
    component: Pages3,
    children: [
      { path: '', redirectTo: 'instructor-board', pathMatch: 'full' },
      { path: 'instructor-board', loadChildren: () => System.import('./instructor/dashboard.module') },      
    ],
    canActivate: [AuthGuard],
  }
];

export const routing = RouterModule.forChild(routes);
