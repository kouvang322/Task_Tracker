import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListBoxComponent } from './component/Listboxes/list-box/list-box.component';
import { ListBoxMedComponent } from './component/Listboxes/list-box-med/list-box-med.component';
import { ListBoxHighComponent } from './component/Listboxes/list-box-high/list-box-high.component';
import { ListUrgentComponent } from './component/Listboxes/list-urgent/list-urgent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListBoxComponent, ListBoxMedComponent, ListBoxHighComponent, ListUrgentComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task-Tracker';
}
