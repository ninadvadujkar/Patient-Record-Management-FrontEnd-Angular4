import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-detail-edit-modal',
  templateUrl: './patient-detail-edit-modal.component.html',
  styleUrls: ['./patient-detail-edit-modal.component.css'],
  providers: [PatientService]
})
export class PatientDetailEditModalComponent implements OnInit {
  updatingData: boolean = false;
  nextApptDateTimeTemp: string;
  firstApptTemp: string;
  updatedAtTemp: string;
  createdAtTemp: string;
  patientData: any = {
    "_id": "",
    "id": "",
    "name": "",
    "age": "",
    "address": "",
    "contact": "",
    "next_appt_date": "",
    "next_appt_time": "",
    "first_appt": "",
    "medication": "",
    "medical_condition": "",
    "details": "",
    "updated_at": "",
    "created_at": "",
    "__v": ""
  };
  @ViewChild(ModalComponent) child;
  
  constructor(private _patientService: PatientService) { }

  ngOnInit() {
  }

  initiate(patientData) {
  	this.nextApptDateTimeTemp = patientData.next_appt_date + "T" + patientData.next_appt_time;
  	this.nextApptDateTimeTemp = this.nextApptDateTimeTemp.slice(0, this.nextApptDateTimeTemp.length - 3); 
  	this.firstApptTemp = new Date(patientData.first_appt).toLocaleString();
  	this.updatedAtTemp = new Date(patientData.updated_at).toLocaleString();
  	this.createdAtTemp = new Date(patientData.created_at).toLocaleString();
  	this.patientData = Object.assign({}, patientData);
  	console.log("Initiate!", this.child);
  	this.child.show();
  }

  hide() {
	this.child.hide();	
  }

  updatePatientData() {
  	try {
	  	let apptDateArr = this.nextApptDateTimeTemp.split('T');
	  	this.patientData.next_appt_date = apptDateArr[0];
	  	this.patientData.next_appt_time = apptDateArr[1] + ":00";
  	} catch(e) {
  		console.log(e);
  	}
  	console.log(this.patientData.next_appt_date);
  	this.updatingData = true;
  	// setTimeout(() => {
  	// 	this.updatingData = false;
  	// 	this.child.hide();
  	// 	alert("Patient Data Updated!");
  	// }, 2000);
  	this._patientService.updatePatient(this.patientData).subscribe(
  		res => {
  			this.updatingData = false;
  			alert("Patient Data Updated!");
  			console.log(res);
  			this.child.hide();
  		},
  		err => {
  			this.updatingData = false;
  			console.log(err);
  			if(err && err.status && (err.status === 401 || err.status === 403)) {
  				console.log("User needs to login again!");
  				alert("Session expired. Logout and Login again.");
  			} else {
  				alert("Some error with backend. Please try again after sometime");
  			}
  			this.child.hide();
  		}
  	)
  }
}
