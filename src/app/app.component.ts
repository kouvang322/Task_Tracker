import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NeonDbService } from './services/neon-db.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomepageComponent } from './component/homepage/homepage.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, DashboardComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NeonDbService]
})
export class AppComponent {
  title = 'Task-Tracker';


  constructor(private dataService: NeonDbService) { }
  
}
