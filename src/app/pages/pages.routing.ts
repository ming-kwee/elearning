import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard } from './login/auth-guard.service';

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
    path: 'confirm/:id/:status',  
    loadChildren: () => System.import('./confirm_customer/confirm.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'instructor-board', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'instructor-board', loadChildren: () => System.import('./instructor/dashboard.module') },      
      { path: 'company', loadChildren: () => System.import('./company/business.module') },
      { path: 'events', loadChildren: () => System.import('./events/events.module') },      
      { path: 'occasion', loadChildren: () => System.import('./occasion/occasion.module') },
      { path: 'reports', loadChildren: () => System.import('./reports/reports.module') },      
      { path: 'create', redirectTo: 'company/profile', pathMatch: 'full' },
      // { path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      // { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      // { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      // { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      // { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
      // { path: 'maps', loadChildren: () => System.import('./maps/maps.module') }
    ],
    canActivate: [AuthGuard],
  }
];

export const routing = RouterModule.forChild(routes);
