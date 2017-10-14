import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [LoginService]
})
export class NavComponent implements OnInit {
  @Input()
  isLogged: boolean;
  title: string = 'Patient Record Management';
  menu = [
  	{
  		name: 'Home',
  		path: '/home',
  		isActive: false
  	},
  	{
  		name: 'Page1',
  		path: '/page1',
  		isActive: false
  	},
  	{
  		name: 'Page2',
  		path: '/page2',
  		isActive: false
  	},
  	{
  		name: 'Page3',
  		path: '/page3',
  		isActive: false
  	}
  ];

  logoutErr: any;
  constructor(private _loginService: LoginService, private _router: Router) {
  }

  ngOnInit() {

  }

  makeTabActive(tab) {
  	this.menu.forEach((item) => {
  		if(item.name === tab.name) {
  			item.isActive = true;
  		} else {
  			item.isActive = false;
  		}
  	});
  }

  disableAllTabs() {
  	this.menu.forEach((item) => {
  		item.isActive = false;
  	});
  }

  logout() {
  	this._loginService.logout().subscribe(
    	data => {
        this._loginService.isLogged.next(false);
        this.isLogged = this._loginService.isLogged.getValue();
        console.log("User logged out!!!", this.isLogged);
    		localStorage.removeItem('username');
    		localStorage.removeItem('token');
    		this._router.navigate(['login']);
    	},
        err  => {
        	this.logoutErr = <any>err;
    		console.log(this.logoutErr);
    	}
    )
  }
}
