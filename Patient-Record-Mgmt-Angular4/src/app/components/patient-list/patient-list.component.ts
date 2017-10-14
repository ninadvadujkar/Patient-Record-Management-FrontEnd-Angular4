import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../services/patient.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [PatientService]
})
export class PatientListComponent implements OnInit {
  loggedIn: boolean = false;
  patientList: object[];
  // state tells us whether response has arrived or not, if yes whether there's an err or not.
  // state 0 - data not arrived, 1 - arrived and success, 2 - arrived and failure 
  state: number = 0;
  constructor(private _patientService: PatientService, private _loginService: LoginService) { }

  ngOnInit() {
  	this.loggedIn = this._loginService.isLogged.getValue();
  	if(this.loggedIn) {
  		console.log("User logged. Can continue");
  		this.getPatientList();
  	} else {
  		console.log("User hasn't logged in yet. Cannot continue");
  	}
  }

  private _getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  getPatientList() {
  	this._patientService.getPatientList().subscribe(
  		res => {
  			if(res) {
  				this.patientList = res.data;
  			} else {
  				this.patientList = [];
  			}
  			this.state = 1;
  		},
  		err => {
  			console.log(err);
  			this.state = 2;
  			if(err && err.status && (err.status === 401 || err.status === 403)) {
  				console.log("User needs to login again!");
  				alert("Session expired. Logout and Login again.");
  			} else {
  				alert("Some error with backend. Please try again after sometime");
  			}
  		}
  	)
  }

  refresh() {
  	this.getPatientList();
  }

  deletePatient(patientId) {
  	this._patientService.deletePatient(patientId).subscribe(
  		res => {
  			console.log("Successfully deleted record. Updating the list!");
			this.getPatientList();
  		},
  		err => {
  			console.log(err);
  			if(err && err.status && (err.status === 401 || err.status === 403)) {
  				console.log("User needs to login again!");
  				alert("Session expired. Logout and Login again.");
  			} else {
  				alert("Some error with backend. Please try again after sometime");
  			}
  		}
  	)
  }

}
