import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent implements OnInit{
  isLogged: boolean = false;
  title: string = 'Patient Record Management';
  logoutErr: any;
  menu = [
    {
      name: 'Home',
      path: '/home',
      isActive: false
    },
    {
      name: 'Add Patient',
      path: '/addpatient',
      isActive: false
    },
    {
      name: 'Patient List',
      path: '/patientlist',
      isActive: false
    },
    {
      name: 'Appointments',
      path: '/appointments',
      isActive: false
    }
  ];
  constructor(private _loginService: LoginService, private cdr: ChangeDetectorRef, private _router: Router) {
  }

  ngOnInit() {
    console.log("Here!!!");
    this._loginService.isLogged.subscribe((val) => {
      console.log(val, 'in main component');
      this.isLogged = val;
      this.cdr.detectChanges();
    })
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
