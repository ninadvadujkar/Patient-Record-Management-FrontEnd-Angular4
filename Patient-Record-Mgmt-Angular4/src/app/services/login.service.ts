import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { basePath } from '../constants'

@Injectable()
export class LoginService {
	public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _serverError(err: any) {
	    console.log('sever error:', err);  // debug
	    if(err instanceof Response) {
	      return Observable.throw(err.json().error || 'backend server error');
	      // if you're using lite-server, use the following line
	      // instead of the line above:
	      //return Observable.throw(err.text() || 'backend server error');
	    }
	    return Observable.throw(err || 'backend server error');
	}
	constructor(private _http: Http) { }
	login(cred) {
		let apiPath = basePath + "/api/auth/login";
		console.log(apiPath);
		return this._http.post(apiPath, cred)
		.map(res => res.json())
		.do((data) => {})
		.catch(this._serverError)
	}

	logout() {
		let userName = localStorage.getItem('username');
		let apiPath = basePath + "/api/auth/logout?username="+userName;
		console.log(apiPath);
		return this._http.get(apiPath)
		.map(res => res.json())
		.do((data) => {})
		.catch(this._serverError);
	}
}
