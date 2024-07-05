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

  public loggedinUsername = "";
  public loggedinUser_Id = 0;


  constructor(private http: HttpClient) {}

  getData(): Observable<Task[]> {
    // return this.http.get<any>(`${this.baseUrl}/api/data`);
    // console.log(this.loggedinUser_Id);

    return this.http.get<Task[]>(`${this.baseUrl}/Dashboard/api/data/${this.loggedinUser_Id}`);
  }

  createTaskItem(newTask: object, userId: Number): Observable<Task>{
    console.log(newTask);
    
    return this.http.post<Task>(`${this.baseUrl}/Dashboard/api/data/createTask`, {newTask, userId});
  }

  taskInfoChanged(task: Task): Observable<Task> {
    console.log(task);

    return this.http.patch<Task>(`${this.baseUrl}/Dashboard/api/data/updateTask`, {task})
  }

  deleteTask(taskId: number): Observable<Task>{
    console.log(taskId);
    // console.log("Delete this task");
    return this.http.delete<Task>(`${this.baseUrl}/Dashboard/api/data/deleteTask/${taskId}`);
  }

  createNewUser(username: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/LoginOrRegister/api/data/register`, {username, password});
  }

  getUserInfo(username: string, password: string): Observable<User>{

    return this.http.post<User>(`${this.baseUrl}/LoginOrRegister/api/data/login/user`, {username, password});
  }
  
  sayHello(){
    console.log("hi, you are connected to service");
  }

}
