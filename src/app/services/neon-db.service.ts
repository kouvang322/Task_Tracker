import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';
import { Key } from 'node:readline';

@Injectable({
  providedIn: 'root'
})
export class NeonDbService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(): Observable<Task[]> {
    // return this.http.get<any>(`${this.baseUrl}/api/data`);
    return this.http.get<Task[]>(`${this.baseUrl}/api/data`);
  }

  createTaskItem(): Observable<Task>{
    console.log("created new task")
    
    return this.http.post<Task>(`${this.baseUrl}/api/data/createTask`, {});
  }

  taskMoved(taskId: number, task: Task): Observable<Task> {
    console.log(taskId);

    return this.http.patch<Task>(`${this.baseUrl}/api/data/updateTask`, {taskId, task})
  }

  deleteTask(taskId: number): Observable<Task>{
    console.log(taskId);
    // console.log("Delete this task");
    return this.http.delete<Task>(`${this.baseUrl}/api/data/deleteTask/
      ${taskId}`);
  }
  
  sayHello(){
    console.log("hi, you are connected to service");
  }

}
