import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { basePath } from '../constants'

@Injectable()
export class PatientService {
	private _serverError(err: any) {
	    console.log('sever error:', err);  // debug
	    if(err instanceof Response) {
	      	return Observable.throw({status: err.status} || 'backend server error');
	    }
	    return Observable.throw(err || 'backend server error');
	}
	constructor(private _http: Http) { }

	getPatientList() {
		let apiPath = basePath + "/api/patients";
		let token: string = localStorage.getItem('token');

		token = this._modifyToken(token);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', token);
		console.log(headers)

		let params = new URLSearchParams();
		params.append('username', localStorage.getItem('username'));

		let options = new RequestOptions({headers: headers, params: params});
		console.log(options);
		return this._http.get(apiPath, options)
		.map(res => res.json())
		.do((data) => {console.log(data)})
		.catch(this._serverError)
	}

	updatePatient(patientData) {
		let patientId = patientData.id;
		let apiPath = basePath + "/api/patients/" + patientId;
		let token: string = localStorage.getItem('token');

		token = this._modifyToken(token);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', token);
		console.log(headers);

		patientData.username = localStorage.getItem('username');

		let options = new RequestOptions({headers: headers});		
		return this._http.put(apiPath, patientData, options)
		.map(res => res.json())
		.do((data) => {console.log(data)})
		.catch(this._serverError)
	}

	addPatient(patientData) {
		let apiPath = basePath + "/api/patients";
		let token: string = localStorage.getItem('token');

		token = this._modifyToken(token);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', token);
		console.log(headers);

		patientData.username = localStorage.getItem('username');

		let options = new RequestOptions({headers: headers});		
		return this._http.post(apiPath, patientData, options)
		.map(res => res.json())
		.do((data) => {console.log(data)})
		.catch(this._serverError)

	}

	deletePatient(patientId) {
		let apiPath = basePath + "/api/patients/" + patientId;
		let token: string = localStorage.getItem('token');

		token = this._modifyToken(token);
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('x-access-token', token);
		console.log(headers);	

		let params = new URLSearchParams();
		params.append('username', localStorage.getItem('username'));

		let options = new RequestOptions({headers: headers, params: params});
		console.log(options);

		return this._http.delete(apiPath, options)
		.map(res => res.json())
		.do((data) => {console.log(data)})
		.catch(this._serverError)

	}

	private _modifyToken(token): string {
		// Remove starting and trailing quotes from the token string.
		let tokenArr: string[] = token.split("");
		tokenArr.shift();
		tokenArr.pop();
		token = tokenArr.join("");
		return token;
	}

}
