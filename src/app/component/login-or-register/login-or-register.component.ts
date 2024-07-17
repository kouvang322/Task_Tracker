import { Component, Inject, OnInit } from '@angular/core';
import { NeonDbService } from '../../services/neon-db.service';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent implements OnInit {

  constructor(private dataService: NeonDbService, private router: Router, @Inject(DOCUMENT) private document: Document) {

    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      try {
        const loggedinUser_Id = Number(localStorage.getItem('user_id'));
        const loggedinUsername = localStorage.getItem('username');
        
        if (loggedinUser_Id && loggedinUsername) {
          this.dataService.setUser({loggedinUser_Id: loggedinUser_Id, loggedinUsername: loggedinUsername });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  ngOnInit(): void {
    const isUserLoggedIn = this.dataService.userLoggedIn();
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  onRegisterSubmit(form: NgForm) {
    //trying to submit the form with the while getting the inputs to use as a user value.
    if (form.value.RegisterPassword === form.value.ConfirmPassword) {
      this.createUser(form.value.RegisterUserName, form.value.RegisterPassword)
    } else {
      alert("Passwords do not match.");
    }
  }

  createdUser!: User;
  createUser(userNameInput: string, passwordInput: string) {

    // console.log(userNameInput);
    // console.log(passwordInput);
    this.dataService.createNewUser(userNameInput, passwordInput).subscribe((data) => {
      this.createdUser = data;
      console.log(this.createdUser);
      this.showAccountCreationConfirmation();
      this.loginUser(userNameInput, passwordInput);

    }, (error) => {
      console.log(error);
    });
  }

  onLoginSubmit(form: NgForm) {
    //trying to submit the form while getting the inputs to compare if user exists

    this.loginUser(form.value.LogInUserName, form.value.LogInPassword)
  }

  loginUser(userNameInput: string, passwordInput: string) {
    this.dataService.getUserInfo(userNameInput, passwordInput).subscribe(data => {
      localStorage.setItem('user_id', (data.user_id!).toString());
      localStorage.setItem('username', data.username);

      this.showLoginSuccess();
      this.router.navigate(['/dashboard']);
    },
      (error) => {
        console.error('Error logging in', error);
      }
    )
  }

  showAccountCreationConfirmation() {
    alert("Account created");
  }

  showLoginSuccess() {
    alert("Login successful.");
    this.dataService.userLoggedIn();
  }
}
