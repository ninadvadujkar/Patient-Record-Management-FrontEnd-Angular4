import { Component, OnInit } from '@angular/core';
import { CheckTokenService } from '../../services/check-token.service';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CheckTokenService]

})
export class HomeComponent implements OnInit {
  token: string;
  loggedIn: boolean;
  constructor(private _tokenService: CheckTokenService, private _loginService: LoginService) { 
  }

  ngOnInit() {
  	this.token = this._tokenService.getToken();
  	if(this.token) {
      this._loginService.isLogged.next(true);
  	}
    console.log(this._loginService.isLogged.getValue());
    this.loggedIn = this._loginService.isLogged.getValue();
  }
}
