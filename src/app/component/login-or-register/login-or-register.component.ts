import { Component } from '@angular/core';
import { NeonDbService } from '../../services/neon-db.service';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent {

  constructor(private dataService: NeonDbService, private router: Router){}
  
  onRegisterSubmit(form: NgForm){
    //trying to submit the form with the while getting the inputs to use as a user value.
    this.createUser(form.value.RegisterUserName, form.value.RegisterPassword)
  }
  
  createdUser!: User;
  createUser(userNameInput: string, passwordInput: string){
    
    // console.log(userNameInput);
    // console.log(passwordInput);
    this.dataService.createNewUser(userNameInput, passwordInput).subscribe((data) => {
      this.createdUser = data;
      console.log(this.createdUser);
      this.showAccountCreationConfirmation();

    }, (error) => {
      console.log(error);
    });
  }

  onLoginSubmit(form: NgForm){
    //trying to submit the form while getting the inputs to compare if user exists

    this.loginUser(form.value.LogInUserName, form.value.LogInPassword)
  }

  
  loginUser(userNameInput: string, passwordInput: string){
    this.dataService.getUserInfo(userNameInput, passwordInput).subscribe(data => {
      localStorage.setItem('token', data.token)
      this.showLoginSuccess();
    },
    (error) => {
      console.error('Error logging in', error);
    }
  )
  }

  showAccountCreationConfirmation(){
    alert("Account created");
    this.router.navigate(['/Dashboard']);
  }

  showLoginSuccess(){
    alert("Login successful.");
    this.router.navigate(['/Dashboard']);
  }
}
