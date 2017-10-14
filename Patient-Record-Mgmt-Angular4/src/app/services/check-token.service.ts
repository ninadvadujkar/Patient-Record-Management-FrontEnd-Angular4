import { Injectable } from '@angular/core';

@Injectable()
export class CheckTokenService {
  token: string;
  constructor() { }
  getToken() {
  	if(localStorage.getItem('token')) {
  		this.token = localStorage.getItem('token');
  		return this.token;
  	} else {
  		return undefined;
  	}  	
  }
}
