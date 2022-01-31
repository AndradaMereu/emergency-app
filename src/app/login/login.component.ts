import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from '../loginUser';
import { User } from '../User';
import { UserListComponent } from '../user-list/user-list.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: LoginUser = new LoginUser();
  router: Router;
  @ViewChild('alert', { static: true })
  alert!: ElementRef;

  constructor(router: Router, private authService: AuthService) { 
    this.router=router;

  }

  ngOnInit(): void {
  }

  login() {
    var inputEmail = (<HTMLInputElement>document.getElementById('loginemail')).value;
    var inputPassword = (<HTMLInputElement>document.getElementById('loginpassword')).value;
    if(inputEmail !== null && inputPassword !== null ){

      this.user.username = inputEmail;
      this.user.password = inputPassword;
    }
    else{
      this.user.username='';
      this.user.password='';
    }

    this.authService.login(this.user).subscribe( res => {
      console.log(res);
      localStorage.setItem("authorization", 'Bearer ' + res.token)
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('username', res.user.name);
      this.router.navigate(['/home']);
    }, 
    err => {
        this.showAlert();
    })
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  showAlert(){
    this.alert.nativeElement.classList.add('show');
  }

//   this.authService.authenticate(this.email,this.password).subscribe((response: any) =>{
//     console.log(response.access_token);
//     localStorage.setItem('access_token',response.access_token);
//     this.userdata = this.getDecodedAccessToken(response.access_token);
//     console.log(this.userdata.role);
//     if (this.userdata.role != null) {

//       switch(this.userdata.role){
//         case "[USER]": this.router.navigate(['/dashboard/regularuser/']);
//         break;
//         case "[REGIONMANAGER]": this.router.navigate(['/dashboard/regionmanager/']);
//         break;
//         case "[ADMIN]": this.router.navigate(['/dashboard/admin/']);
//         break;

//       }
      

//       //this.router.navigate(['/regularuser/',this.userdata[0]])
//       //this.invalidLogin = false
//       console.log(this.email);
//       console.log(this.password);
//     } else
//       {//this.invalidLogin = true
//       alert("Credentials are not correct")};
// },
// (error: HttpErrorResponse) => {
//   alert(error.message);
// })

 
//   }


}
