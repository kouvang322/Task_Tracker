import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './component/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { NeonDbService } from './services/neon-db.service';
import { Task } from './interfaces/Task';
import { error } from 'console';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NeonDbService]
})
export class AppComponent {
  title = 'Task-Tracker';

  constructor(private dataService: NeonDbService) { }
  
}
