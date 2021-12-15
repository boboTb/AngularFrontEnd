import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../service/web-api.service';
import { AuthenticateModel } from '../model/AuthenticateModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = "Admin";
  password = "Admin";
  alert:boolean =false;
  user:AuthenticateModel = new AuthenticateModel();
  constructor(private webApiService: WebApiService,private router: Router) { }

  ngOnInit(): void {
  }
  Login()
  {
    this.user.Username = this.username;
    this.user.Password = this.password;
    this.webApiService.Login(this.user).subscribe(
      ret=>
      {
        if(ret != null){
        localStorage.setItem('token', ret.access_token)
        this.router.navigate(['/student']);
        }
        else{
          this.alert=true; 
        }
      }
    )
  }

}
