import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';
import { User } from '../interfaces/User';


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

  createTaskItem(newTask: object): Observable<Task>{
    console.log(newTask);
    
    return this.http.post<Task>(`${this.baseUrl}/api/data/createTask`, {newTask});
  }

  taskInfoChanged(task: Task): Observable<Task> {
    console.log(task);

    return this.http.patch<Task>(`${this.baseUrl}/api/data/updateTask`, {task})
  }

  deleteTask(taskId: number): Observable<Task>{
    console.log(taskId);
    // console.log("Delete this task");
    return this.http.delete<Task>(`${this.baseUrl}/api/data/deleteTask/
      ${taskId}`);
  }

  createNewUser(newUsername: string, newPassword: string): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/LoginOrRegister/api/data/register`, {newUsername, newPassword});
  }

  getUserInfo(username: string, password: string){
    console.log(username, password);

    return this.http.post<any>(`${this.baseUrl}/LoginOrRegister/api/data/login/user`, {username, password});
  }
  
  sayHello(){
    console.log("hi, you are connected to service");
  }

}
