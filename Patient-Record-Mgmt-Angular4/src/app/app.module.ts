import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { PatientDetailEditModalComponent } from './components/patient-detail-edit-modal/patient-detail-edit-modal.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    PatientListComponent,
    ModalComponent,
    PatientDetailEditModalComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'patientlist',
        component: PatientListComponent
      },
      {
        path: 'addpatient',
        component: AddPatientComponent
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
