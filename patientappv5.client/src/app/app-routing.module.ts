import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: PatientFormComponent },
  { path: 'search', component: PatientSearchComponent },
  { path: 'list', component: PatientListComponent },
  { path: '**', redirectTo: '/form' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
