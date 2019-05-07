import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;
  loginResponse: any;
  alert = {
    message: ''
  }
  showAlert: boolean = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {

    this.service.getCurrentUser().then(user => console.log(user)).catch(err => console.log(err));

  }

  async login(){
    
    this.service.changeLoadingState(true);

    await this.service.userLogin(this.userName, this.password).then(response => this.loginResponse = response);

    if(!this.loginResponse.user){
      this.alert.message = this.loginResponse.message
      this.showAlert = true;
      this.service.changeLoadingState(false);
    }
    else{
      this.showAlert = false;
      this.router.navigate(['/admin']);
      this.service.changeLoadingState(false);
    }
  }

}
