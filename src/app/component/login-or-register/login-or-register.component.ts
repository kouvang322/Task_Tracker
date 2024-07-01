import { Component } from '@angular/core';
import { NeonDbService } from '../../services/neon-db.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent {

  constructor(private dataService: NeonDbService){}
  
  createdUser!: User;
  createUser(){
    const testUser: User = {
      userName: "Kouvang",
      password: "Test123"
    }
    this.dataService.createNewUser(testUser).subscribe((data: User) => {
      this.createdUser = data;
      console.log(this.createdUser);

    }, (error) => {
      console.log(error);
    });
  }
}
