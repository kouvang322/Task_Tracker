import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NeonDbService } from '../../services/neon-db.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  constructor(private router: Router, private dataService: NeonDbService, @Inject(DOCUMENT) private document: Document) {

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

  GoToLoginOrRegisterPage(){
    this.router.navigate(['/loginorregister']);
  }
}
