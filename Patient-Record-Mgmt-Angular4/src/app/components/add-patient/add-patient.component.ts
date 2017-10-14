import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
  providers: [PatientService]
})
export class AddPatientComponent implements OnInit {
  patientData: any = {};
  nextApptDateTimeTemp: string;
  loggedIn: boolean = false;
  constructor(private _patientService: PatientService, private _loginService: LoginService) { }

  ngOnInit() {
  	this.loggedIn = this._loginService.isLogged.getValue();
  	if(this.loggedIn) {
  		console.log("User logged. Can continue");
  	} else {
  		console.log("User hasn't logged in yet. Cannot continue");
  	}
  }

  addPatient() {
  	let apptDateArr = this.nextApptDateTimeTemp.split('T');
  	this.patientData.next_appt_date = apptDateArr[0];
  	this.patientData.next_appt_time = apptDateArr[1] + ":00";
  	
  	this._patientService.addPatient(this.patientData).subscribe(
  		res => {
  			alert("Patient successfully added!");
  		},
  		err => {
  			console.log(err);
  			if(err.status === 401 || err.status === 403) {
  				console.log("User needs to login again!");
  				alert("Session expired. Logout and Login again.");
  			} else {
  				alert("Some error with backend. Please try again after sometime");
  			}
  		}
  	)
  }

}
