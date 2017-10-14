import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  username: string;
  passwd: string;
  token: string;
  errorMsg: string;
  constructor(private _loginService: LoginService, private _router: Router) {
  }

  ngOnInit() {
  	this.username = "";
  	this.passwd = "";
  }

  login() {
  	let cred = {
  		username: this.username, 
  		passwd: this.passwd
  	}
  	this.username = "";
  	this.passwd = "";
  	this._loginService.login(cred).subscribe(
    	data => {
    		this.token = data.token;
    		localStorage.setItem('token', JSON.stringify(this.token));
    		localStorage.setItem('username', cred.username);
        console.log("User logged in!!!");
    		this._router.navigate(['home']);
    	},
        err  => {
        	alert("Login Failed! Enter valid credentials");
        	this.errorMsg = <any>err;
    		console.log(this.errorMsg);
    	}
    );
  }

  logout() {
  	localStorage.removeItem('token');
  }
}
