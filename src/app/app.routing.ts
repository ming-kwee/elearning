import { Routes, RouterModule } from '@angular/router';

// import { CanActivateViaAuthGuard} from './CanActivateViaAuthGuard';


export const routes: Routes = [
  { path: '', redirectTo: 'pages2', pathMatch: 'full'},
  { path: '**', redirectTo: 'pages2/home' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
