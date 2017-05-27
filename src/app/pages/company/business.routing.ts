import { Routes, RouterModule }  from '@angular/router';

import { Business } from './business.component';

import { Profile } from './components/profile/profile.component';
import { EventSeminarList } from './components/eventseminar/eventSeminarList.component';
import { EventSeminar } from './components/eventseminar/eventSeminar.component';
import { Sponsorship } from './components/sponsorship/sponsorship.component';
import { SponsorshipList } from './components/sponsorship/sponsorshipList.component';
import { Ckeditor } from './components/ckeditor/ckeditor.component';

import { AuthGuard } from '../login/auth-guard.service';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Business,
    children: [
      { path: 'profile', component: Profile },        
      { path: 'eventseminar-list', component: EventSeminarList },      
      { path: 'eventseminar/:eventid', component: EventSeminar },
      { path: 'sponsorship-list', component: SponsorshipList },
      { path: 'sponsorship/:sponsorid/:eventid/:eventname', component: Sponsorship },
      { path: 'templateeditor', component: Ckeditor }        
    ],
    canActivate: [AuthGuard],
  }
];

export const routing = RouterModule.forChild(routes);
