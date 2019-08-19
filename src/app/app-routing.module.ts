import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormCreateContactComponent} from './components/create-contact-form/form-create-contact.component';

const routes: Routes = [
  {
    component: FormCreateContactComponent,
    path: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
