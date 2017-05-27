import { Routes, RouterModule }  from '@angular/router';

import { Occasion } from './occasion.component';
import { GenerateBarcode } from './components/generatebarcode/generatebarcode.component';
import { TemplateBarcode } from './components/templatebarcode/templatebarcode.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Occasion,
    children: [
      { path: 'generatebarcode', component: GenerateBarcode},
      { path: 'templatebarcode/:id/:name', component: TemplateBarcode}
    //   { path: 'masterkota-detail/:id', component: MasterkotaDetail}
      // { path: 'masterkota-detail', component: MasterkotaDetail}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
